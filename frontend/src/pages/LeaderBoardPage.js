import React from 'react';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import Leaderboard from '../components/LeaderBoard';
import Navigation from '../components/Navigation'; 
import '../styles.css';

const LeaderboardPage = () =>
{
    return(
        <div style={{ backgroundColor: '#001C2C', height: '100vh' }}>
        <Navigation />
        <Logo />
        <PageTitle />
        <Leaderboard />
        </div>
    );
}

export default LeaderboardPage;