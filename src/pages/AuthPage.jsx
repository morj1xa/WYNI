import { useState } from 'react';
import '../App.css';
import './RegisterPage.css';
import AuthForm from '../components/AuthForm'
import { useNavigate } from 'react-router-dom';

export default function AuthPage() {
    return (
        <div className="register-container">
            <div className="register-box">
                <h2>Авторизация</h2>
                <AuthForm />
            </div>
        </div>
    )
}