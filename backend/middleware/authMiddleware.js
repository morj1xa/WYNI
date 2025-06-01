const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

module.exports = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: "Нет токена" });

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ error: "Нет токена" });

    try {
        const decoded = jwt.verify(token, SECRET_KEY);
        console.log(decoded)
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Ошибка при верификации токена:", err.message);
        res.status(403).json({ error: "Неверный токен" });
    }
};
