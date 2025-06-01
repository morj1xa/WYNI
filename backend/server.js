const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adsRoutes = require("./routes/ads");
const messagesRoutes = require("./routes/messages")
const categoriesRoutes = require("./routes/categories")
const brandsRoutes = require("./routes/brands")
const favoritesRoutes = require('./routes/favorites');
const usersRoutes = require('./routes/users');
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
        const token = jwt.sign({ userId: user.id, email: user.email, avatar_url: user.avatar_url }, SECRET_KEY); // Токен - вечный на время разраюотки

        res.json({ message: "Авторизация успешна", token, user: { id: user.id, username: user.username, email: user.email, avatar_url: user.avatar_url } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.use("/ads", adsRoutes)
app.use("/chats", messagesRoutes)
app.use("/categories", categoriesRoutes)
app.use("/brands", brandsRoutes)
app.use('/favorites', favoritesRoutes);
app.use('/users', usersRoutes);

// Запускаем сервер
app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
