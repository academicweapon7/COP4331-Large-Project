import React from 'react';
import Grid from '@mui/material/Grid';
import Navigation from '../components/Navigation'; 
import PageTitle from '../components/PageTitle';
import Leaderboard from '../components/LeaderBoard';
import '../styles.css';

const LeaderboardPage = () => {
    return (
        <div className="home-page">
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Grid item xs={12}>
                    <PageTitle />
                </Grid>
                <Grid item xs={12}>
                    <Leaderboard />
                </Grid>
            </Grid>
        </div>
    );
}

export default LeaderboardPage;
