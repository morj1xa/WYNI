const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");  // Подключаем JWT
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const app = express();

app.use(cors());
app.use(bodyParser.json());

require("dotenv").config();
const SECRET_KEY = process.env.SECRET_KEY;

// Регистрация пользователя
app.post("/register", async (req, res) => {
    try {
        const { email, password, username } = req.body;

        const existingUser = await prisma.users.findUnique({
            where: { email },
        });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await prisma.users.create({
            data: {
                email,
                username,
                password_hash: hashedPassword,
            },
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Авторизация пользователя 
app.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.users.findUnique({
            where: { email },
        });

        if (!user) {
            return res.status(400).json({ error: "Пользователь не найден" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({ error: "Неверный пароль" });
        }

        // Генерируем JWT-токен
        const token = jwt.sign({ userId: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Авторизация успешна", token, user: { id: user.id, username: user.username, email: user.email } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

// Пример защищенного маршрута (только для авторизованных пользователей)
app.get("/profile", async (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        const user = await prisma.users.findUnique({ where: { id: decoded.userId } });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        res.json({ message: "Protected route accessed", user });
    } catch (error) {
        res.status(403).json({ error: "Invalid token" });
    }
});

app.get("/ads", async (req, res) => {
    try {
        const ads = await prisma.ads.findMany(); // Предполагаем, что у тебя есть таблица ads
        res.json(ads);
    } catch (error) {
        console.error("Ошибка получения объявлений:", error);
        res.status(500).json({ error: "Ошибка сервера" });
    }
});


// Запускаем сервер
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
