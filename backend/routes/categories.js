const express = require('express');
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const upload = require('../middleware/uploadMiddleware'); // Импортируем middleware для загрузки файлов
const authenticate = require('../middleware/authMiddleware'); // Импортируем middleware для проверки JWT
const prisma = new PrismaClient();

const router = express.Router();
router.use(cors());

router.get("/", async (req, res) => {           //Получение всех категорий
    try {
        const categories = await prisma.categories.findMany({

        });
        res.json(categories);
    } catch (error) {
        console.error("Ошибка получения категорий:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});


module.exports = router;