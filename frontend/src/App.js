import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import PasswordResetPage from './pages/PasswordResetPage';

function App() {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/leaderboard" index element={<LeaderBoardPage />} />
        <Route path="/passwordreset" index element={<PasswordResetPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;