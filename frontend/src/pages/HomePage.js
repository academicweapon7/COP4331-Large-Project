import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import CustomTitle from '../components/CustomTitle';
import Logo from '../components/Logo';
import Slider from '../components/Slider'; 
import Navigation from '../components/Navigation'; 

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
        <div>
            <Navigation />
            <Logo />
            <CustomTitle />
            <div className="container">
                <div className="row justify-content-center mt-5">
                    <div className="col-md-3">
                        <Slider showLogin={showLogin} handleToggleForm={handleToggleForm} />
                    </div>
                </div>
                <div className="row justify-content-center mt-3">
                    <div className="col-md-3">
                        {showLogin ? <Login /> : <Register />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
