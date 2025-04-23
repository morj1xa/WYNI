import { useState } from 'react';
import '../App.css';
import './RegisterPage.css';
import './AuthPage'
import RegisterForm from '../components/RegisterForm';

export default function RegisterPage() {
    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Регистрация</h2>
                <RegisterForm />
            </div>
        </div>
    )
}