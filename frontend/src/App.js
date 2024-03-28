import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LeaderBoardPage from './pages/LeaderBoardPage';
import HomePage from './pages/HomePage';

function App() {
    return (
        <BrowserRouter>
        <Routes>
        <Route path="/" index element={<HomePage />} />
        <Route path="/leaderboard" index element={<LeaderBoardPage />} />
        </Routes>
        </BrowserRouter>
    );
}

export default App;