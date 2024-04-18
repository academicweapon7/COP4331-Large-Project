import React, { useState } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import Slider from '../components/Slider'; 

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
        <div style={{ backgroundColor: '#001C2C', height: '100vh' }}>
            <PageTitle />
            <Logo />
            <div className="container" style={{ backgroundColor: '#001C2C' }}>
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
