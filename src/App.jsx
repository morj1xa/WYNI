import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import Header from "./components/Header"
import Hero from './components/Hero'
import CreateAdPage from './pages/CreateAdPage'
import './App.css'

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/authorization" element={<AuthPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/createad" element={<CreateAdPage />} />
      </Routes>
    </Router>
  );
}

export default App
