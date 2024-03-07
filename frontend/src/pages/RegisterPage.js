import React from 'react';
import PageTitle from '../components/PageTitle';
import Register from '../components/Register';

const RegisterPage = () =>
{
    return(
        <div>
        <PageTitle />
        <Register />
        <a href = "/">
            Already a user? Login now!
        </a>
        </div>
    );
};

export default RegisterPage;