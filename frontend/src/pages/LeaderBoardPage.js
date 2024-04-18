import React from 'react';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import Leaderboard from '../components/LeaderBoard';

const LeaderboardPage = () =>
{
    return(
        <div>
        <PageTitle />
        <Logo />
        <Leaderboard />
        </div>
    );
}

export default LeaderboardPage;