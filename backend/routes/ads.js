const express = require('express');
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const upload = require('../middleware/uploadMiddleware'); // Импортируем middleware для загрузки файлов
const authenticate = require('../middleware/authMiddleware'); // Импортируем middleware для проверки JWT
const prisma = new PrismaClient();

const router = express.Router();
router.use(cors());

router.get("/", async (req, res) => {           //Получение всех объявлений
    try {
        const ads = await prisma.ads.findMany({
            include: {
                categories: true,
                images: true,
                brand: true,
                users: {
                    select: {
                        username: true,
                    }
                },

            },
        });
        res.json(ads);
    } catch (error) {
        console.error("Ошибка получения объявлений:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});

router.get('/my', authenticate, async (req, res) => {         //Получение своих обьявлений
    try {
        const userId = req.user.userId;

        const myAds = await prisma.ads.findMany({
            where: { user_id: userId },
            include: {
                images: true,
                brand: true,
            },
        });
        res.json(myAds);
    } catch (error) {
        console.error('Ошибка при получении объявлений пользователя:', error);
        res.status(500).json({ error: 'Ошибка сервера' });
    }
});

router.post('/', authenticate, upload.array('images', 5), async (req, res) => {         // Создание объявления с изображениями
    try {
        const { title, description, price, category_id, location, brandId } = req.body;

        if (!title || !description || !price || !category_id || !location || !brandId) {
            return res.status(400).json({ error: 'Все поля обязательны' });
        }

        const ad = await prisma.ads.create({
            data: {
                title,
                description,
                price: parseFloat(price),
                category_id: parseInt(category_id),
                location,
                user_id: req.user.userId, // ID пользователя из JWT
                brandId: parseInt(brandId)
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

// GET /ads/:id
router.get('/:id', async (req, res) => {
    const adId = parseInt(req.params.id, 10);

    try {
        const ad = await prisma.ads.findUnique({
            where: { id: adId },
            include: {
                users: { select: { id: true, username: true } },
                images: true,
                categories: true,
                brand: true,
            }
        });

        if (!ad) {
            return res.status(404).json({ error: 'Объявление не найдено' });
        }

        res.json(ad);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ошибка при получении объявления' });
    }
});


module.exports = router;
