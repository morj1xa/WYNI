const express = require('express');
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const authenticate = require('../middleware/authMiddleware');


const router = express.Router();
router.use(cors());

// POST /api/messages
router.post('/', async (req, res) => {          //Создание нового сообщения
    const { ad_id, sender_id, receiver_id, message } = req.body;

    try {
        const newMessage = await prisma.messages.create({
            data: {
                ad_id,
                sender_id,
                receiver_id,
                message,
            }
        });

        res.status(201).json(newMessage);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при отправке сообщения' });
    }
});

// GET /my
router.get('/my', authenticate, async (req, res) => {
    const userId = req.user.userId; // или req.user.id — зависит от твоего токена


    try {
        const chats = await prisma.messages.findMany({
            where: {
                AND: [
                    {
                        OR: [
                            { sender_id: userId },
                            { receiver_id: userId }
                        ]
                    },
                    { sender_id: { not: null } },
                    { receiver_id: { not: null } }
                ]
            },
            orderBy: { sent_at: 'desc' },
            include: {
                ads: {
                    select: {
                        id: true,
                        title: true,
                        images: true,
                    }
                },

                users_messages_sender_idTousers: { select: { id: true, username: true } },
                users_messages_receiver_idTousers: { select: { id: true, username: true } }
            }
        });


        // Группируем по ad_id и собеседнику
        const grouped = {};
        chats.forEach(msg => {
            const otherUser = msg.sender_id === userId ? msg.receiver_id : msg.sender_id;
            const key = `${msg.ad_id}_${otherUser}`;
            if (!grouped[key]) grouped[key] = msg;
        });

        res.json(Object.values(grouped));

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении чатов' });
    }
});

router.post('/messages', authenticate, async (req, res) => {
    const user1 = req.user.userId;
    const { ad_id, user2 } = req.body;

    if (!ad_id || !user2) {
        return res.status(400).json({ error: 'Необходимы ad_id и user2' });
    }

    try {
        const messages = await prisma.messages.findMany({
            where: {
                ad_id,
                OR: [
                    { sender_id: user1, receiver_id: user2 },
                    { sender_id: user2, receiver_id: user1 }
                ]
            },
            orderBy: { sent_at: 'asc' }
        });

        res.json(messages);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении сообщений чата' });
    }
});



module.exports = router;