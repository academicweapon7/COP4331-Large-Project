import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from './pages/HomePage';
import AboutUsPage from './pages/AboutUsPage';
import LeaderboardPage from './pages/LeaderBoardPage';
import PasswordResetPage from './pages/PasswordResetPage';
import AccountVerificationPage from './pages/AccountVerificationPage';
import AccountPage from './pages/AccountPage';

function App() {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/aboutus" index element={<AboutUsPage />} />
        <Route path="/passwordreset" index element={<PasswordResetPage />} />
        <Route path="/accountverification" index element={<AccountVerificationPage />} />
        <Route path="/leaderboard" index element={<LeaderboardPage />} />
        <Route path="/account" index element={<AccountPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;