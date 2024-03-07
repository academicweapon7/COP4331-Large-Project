import React from 'react';
import PageTitle from '../components/PageTitle';
import Login from '../components/Login';

const LoginPage = () =>
{
    return(
        <div>
        <PageTitle />
        <Login />
        <a href = "/Register">
            New User? Sign up here!
        </a>
        </div>
    );
};

export default LoginPage;