import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Navigation from '../components/Navigation';
import PageTitle from '../components/PageTitle';
import Account from '../components/Account';
import '../styles.css';

const AccountPage = () => {

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
                    <Account />
                </Grid>
            </Grid>
        </div>
    );
}
  
export default AccountPage;
