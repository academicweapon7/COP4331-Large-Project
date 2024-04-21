import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Navigation from '../components/Navigation';
import PageTitle from '../components/PageTitle';
import AccountVerification from '../components/AccountVerification';
import CreateCode from '../components/CreateCode'; 
import '../styles.css';

const AccountVerificationPage = () => {

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
                    <CreateCode />
                    <AccountVerification />
                </Grid>
            </Grid>
        </div>
    );
}
  
export default AccountVerificationPage;
