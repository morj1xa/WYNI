import { useState } from 'react';
import FormInput from './FormInput';
import ErrorMessage from './ErrorMessage';

export default function RegisterForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password || !username) {
            setError('Все поля обязательны для заполнения');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, username }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('Регистрация прошла успешно!');
            } else {
                setError(data.error || 'Ошибка регистрации');
            }
        } catch (err) {
            setError('Произошла ошибка при отправке данных');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <FormInput
                type="text"
                id="name"
                placeholder="Имя"
                value={username}
                onChange={(e) => setName(e.target.value)}
            />
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
            <button type="submit">Зарегистрироваться</button>
            <p>Уже есть аккаунт? <a href="/authorization">Войти</a></p>
        </form>
    );
};
