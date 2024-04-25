import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Navigation from '../components/Navigation';
import DisplayEmail from '../components/DisplayEmail';
import PageTitle from '../components/PageTitle';
import AccountVerification from '../components/AccountVerification';
import '../styles.css';

const AccountVerificationPage = () => {

    return (
        <div className="home-page">
            <Grid container spacing={4}>
                <Grid item xs={8}>
                    <Navigation />
                </Grid>
                <Grid item xs={4}>
                    <DisplayEmail />
                </Grid>
                <Grid item xs={12}>
                    <PageTitle />
                </Grid>
                <Grid item xs={12}>
                    <AccountVerification />
                </Grid>
            </Grid>
        </div>
    );
}
  
export default AccountVerificationPage;
