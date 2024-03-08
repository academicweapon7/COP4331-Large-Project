import React from 'react';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import LoggedInName from '../components/LoggedInName';
import LeaderBoard from '../components/LeaderBoard';


const CardPage = () =>
{
    return(
        <div>
        <PageTitle />
        <Logo />
        <LoggedInName />
        <LeaderBoard />
        </div>
    );
}

export default CardPage;