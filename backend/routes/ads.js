const express = require('express');
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const upload = require('../middleware/uploadMiddleware'); // Импортируем middleware для загрузки файлов
const authenticate = require('../middleware/authMiddleware'); // Импортируем middleware для проверки JWT
const prisma = new PrismaClient();

const router = express.Router();
router.use(cors());

router.get("/", async (req, res) => {
    try {
        const ads = await prisma.ads.findMany({
            include: {
                images: true, // <== это правильно
            },
        });
        res.json(ads);
    } catch (error) {
        console.error("Ошибка получения объявлений:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

// Создание объявления с изображениями
router.post('/', authenticate, upload.array('images', 5), async (req, res) => {
    try {
        const { title, description, price, category_id, location } = req.body;

        if (!title || !description || !price || !category_id || !location) {
            return res.status(400).json({ error: 'Все поля обязательны' });
        }

        const ad = await prisma.ads.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                category_id: parseInt(category_id),
                location,
                user_id: req.user.id, // ID пользователя из JWT
            },
        });

        // Сохраняем ссылки на изображения в БД
        const imageLinks = req.files.map(file => ({
            ad_id: ad.id,
            image_url: file.location, // Ссылка на изображение, которая хранится в Yandex Object Storage
        }));

        // Сохраняем записи о изображениях в базе данных
        await prisma.images.createMany({ data: imageLinks });

        res.status(201).json({ message: 'Объявление успешно создано', ad });
    } catch (error) {
        console.error('Ошибка при создании объявления:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

module.exports = router;
