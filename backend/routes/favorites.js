const express = require('express');
const { PrismaClient } = require('@prisma/client');
const authenticate = require('../middleware/authMiddleware'); // JWT middleware

const prisma = new PrismaClient();
const router = express.Router();

// Получить все избранные объявления пользователя
router.get('/', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;

        const favorites = await prisma.favorites.findMany({
            where: { user_id: userId },
            include: {
                ads: {
                    include: { images: true },
                },
            },
        });

        const favoriteAds = favorites.map(fav => fav.ads);
        res.json(favoriteAds);
    } catch (error) {
        console.error('Ошибка при получении избранного:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

// Добавить объявление в избранное
router.post('/', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;
        const { ad_id } = req.body;

        if (!ad_id) {
            return res.status(400).json({ error: 'ad_id обязателен' });
        }

        const exists = await prisma.favorites.findUnique({
            where: {
                user_id_ad_id: {
                    user_id: userId,
                    ad_id: ad_id,
                },
            },
        });

        if (exists) {
            return res.status(409).json({ error: 'Уже в избранном' });
        }

        await prisma.favorites.create({
            data: {
                user_id: userId,
                ad_id: ad_id,
            },
        });

        res.status(201).json({ message: 'Добавлено в избранное' });
    } catch (error) {
        console.error('Ошибка при добавлении в избранное:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});


// Удалить из избранного
router.delete('/:ad_id', authenticate, async (req, res) => {
    try {
        const userId = req.user.userId;
        const ad_id = parseInt(req.params.ad_id);

        if (!ad_id) {
            return res.status(400).json({ error: 'ad_id обязателен' });
        }

        await prisma.favorites.delete({
            where: {
                user_id_ad_id: {
                    user_id: userId,
                    ad_id: ad_id,
                },
            },
        });

        res.json({ message: 'Удалено из избранного' });
    } catch (error) {
        console.error('Ошибка при удалении из избранного:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
