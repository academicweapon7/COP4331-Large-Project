import React from 'react';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import Leaderboard from '../components/LeaderBoard';

const LeaderboardPage = () =>
{
    return(
        <div style={{ backgroundColor: '#C6DAD9', height: '100vh' }}>
        <PageTitle />
        <Logo />
        <Leaderboard />
        </div>
    );
}

export default LeaderboardPage;