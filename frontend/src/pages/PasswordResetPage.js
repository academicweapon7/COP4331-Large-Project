import React from 'react';
import Grid from '@mui/material/Grid';
import PageTitle from '../components/PageTitle';
import PasswordReset from '../components/PasswordReset';
import Navigation from '../components/Navigation';
import '../styles.css';

const PasswordResetPage = () => {
    return (
        <div className="home-page">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Grid item xs={12}>
                    <PageTitle />
                </Grid>
                <Grid item xs={12}>
                    <PasswordReset />
                </Grid>
            </Grid>
        </div>
    );
};
  
export default PasswordResetPage;
