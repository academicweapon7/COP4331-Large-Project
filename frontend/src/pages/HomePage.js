import React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo'

const HomePage = () => {
  return (
    <div>
        <PageTitle />
        <Logo />
        <div className="container">
            <div className="row justify-content-center mt-5">
                <div className="col-md-3">
                    <Login />
                </div>
                <div className="col-md-3">
                    <Register />
                </div>
            </div>
        </div>
    </div>
    );
};

export default HomePage;
