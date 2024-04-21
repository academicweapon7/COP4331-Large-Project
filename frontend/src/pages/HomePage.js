import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Navigation from '../components/Navigation';
import Logo from '../components/Logo';
import CustomTitle from '../components/CustomTitle';
import Slider from '../components/Slider';
import Login from '../components/Login';
import Register from '../components/Register';
import '../styles.css';

const HomePage = () => {
    const [showLogin, setShowLogin] = useState(true);

    const handleToggleForm = (formType) => {
        if (formType === 'login') {
            setShowLogin(true);
        } else if (formType === 'register') {
            setShowLogin(false);
        }
    };

    return (
        <div className="home-page">
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Navigation />
                </Grid>
                <Grid item xs={1}/>
                <Grid item xs={4}>
                    <Logo />
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <CustomTitle />
                        </Grid>
                        <Grid item xs={12}>
                            <Slider showLogin={showLogin} handleToggleForm={handleToggleForm} />
                        </Grid>
                        <Grid item xs={12}>
                            {showLogin ? <Login /> : <Register />}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={1}/>
            </Grid>
        </div>
    );
};

export default HomePage;
