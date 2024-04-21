import React from 'react';
import Grid from '@mui/material/Grid';
import PageTitle from '../components/PageTitle';
import Navigation from '../components/Navigation';
import AboutUs from '../components/AboutUs';
import '../styles.css';

const AboutUsPage = () => {
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
                    <AboutUs />
                </Grid>
            </Grid>
        </div>
    );
};
  
export default AboutUsPage;
