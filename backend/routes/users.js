const express = require('express');
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const upload = require('../middleware/uploadMiddleware');
const authenticate = require('../middleware/authMiddleware');

const router = express.Router();
router.use(cors());

router.post('/avatar', authenticate, upload.single('avatar'), async (req, res) => {
    const userId = req.user.userId;

    if (!req.file || !req.file.location) {
        return res.status(400).json({ error: 'Файл не загружен или нет URL' });
    }

    const avatarUrl = req.file.location; // Предполагается, что uploadMiddleware загружает в Яндекс и возвращает .location

    try {
        await prisma.users.update({
            where: { id: userId },
            data: { avatar_url: avatarUrl },
        });

        const updatedUser = await prisma.users.findUnique({ where: { id: userId } });

        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error('Ошибка обновления аватара:', error);
        return res.status(500).json({ error: 'Ошибка обновления аватара' });
    }
});

router.put('/update', authenticate, async (req, res) => {
    const userId = req.user.userId;
    const { username } = req.body;

    if (!username || username.trim().length < 3) {
        return res.status(400).json({ error: 'Неверное имя пользователя' });
    }

    try {
        const updatedUser = await prisma.users.update({
            where: { id: userId },
            data: { username: username.trim() },
            select: {
                id: true,
                username: true,
                email: true,
                avatar_url: true,
                phone: true,
                created_at: true
            },
        });

        res.json(updatedUser);
    } catch (error) {
        console.error('Ошибка при обновлении пользователя:', error);
        res.status(500).json({ error: 'Внутренняя ошибка сервера' });
    }
});

module.exports = router;
