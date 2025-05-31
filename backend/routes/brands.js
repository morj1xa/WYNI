const express = require('express');
const cors = require("cors");
const { PrismaClient } = require('@prisma/client');
const upload = require('../middleware/uploadMiddleware'); // Импортируем middleware для загрузки файлов
const authenticate = require('../middleware/authMiddleware'); // Импортируем middleware для проверки JWT
const prisma = new PrismaClient();

const router = express.Router();
router.use(cors());

// GET /brands?search=nike
router.get('/', async (req, res) => {
    const { search } = req.query;
    const brands = await prisma.brands.findMany({
        where: {
            name: {
                contains: search || '',
                mode: 'insensitive',
            },
        },
        take: 10,
    });
    res.json(brands);
});

module.exports = router;