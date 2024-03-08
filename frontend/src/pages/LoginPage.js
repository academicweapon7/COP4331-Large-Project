import React from 'react';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import Login from '../components/Login';

const LoginPage = () => 
{
    return (
        <div>
            <PageTitle />
            <Logo />
            <Login />
            <div className="text-center">
                <a href="/Register">
                    New User? Sign up here!
                </a>
            </div>
        </div>
    );
};

export default LoginPage;
