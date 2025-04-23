import { useState } from 'react';
import FormInput from './FormInput';
import ErrorMessage from './ErrorMessage';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate(); // Хук для навигации

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            setError('Все поля обязательны для заполнения');
            return;
        }

        try {
            // Логируем, что отправляется в запросе
            console.log('Отправка запроса на сервер:', { email, password });

            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            // Логируем, какой ответ приходит от сервера
            const data = await response.json();
            console.log('Ответ от сервера:', data);

            if (response.ok) {
                localStorage.setItem("token", data.token); // Сохранение токена в localStorage
                localStorage.setItem("user", JSON.stringify(data.user)); // Сохранение данных пользователя
                navigate('/profile'); // Перенаправление в профиль
            } else {
                setError(data.error || 'Ошибка авторизации');
            }
        } catch (err) {
            console.error('Ошибка при отправке данных:', err); // Логирование ошибки
            setError('Произошла ошибка при отправке данных');
        }
    };
    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                type="email"
                id="email"
                placeholder="Почта"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <FormInput
                type="password"
                id="password"
                placeholder="Пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <ErrorMessage message={error} />
            <button type="submit">Войти</button>
            <p>Еще нет аккаунта? <a href='/register' >Зарегистрироваться</a></p>
        </form>
    );
};