import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import AuthPage from './pages/AuthPage'
import ProfilePage from './pages/ProfilePage'
import Header from "./components/Header"
import Hero from './components/Hero'
import CreateAdPage from './pages/CreateAdPage'
import ChatPage from './pages/ChatPage'
import AdPage from './pages/AdPage'
import FilteredAdsPage from './pages/FilteredAdsPage'
import './App.css'
import Footer from './components/Footer'

function App() {
  return (
    <div className="container">

      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/authorization" element={<AuthPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/createad" element={<CreateAdPage />} />
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/ad/:id" element={<AdPage />} />
          <Route path="/filter/:type/:value" element={<FilteredAdsPage />} />
        </Routes>
        <div className='full-width-block'>
          <Footer />
        </div>
      </Router>
    </div>
  );
}

export default App
