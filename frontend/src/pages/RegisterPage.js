import React from 'react';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import Register from '../components/Register';

const RegisterPage = () => {
    
    return (
        <div>
            <PageTitle />
            <Logo />
            <Register />
            <div className="text-center">
                <a href="/">
                    Already a user? Login now!
                </a>
            </div>
        </div>
    );
};

export default RegisterPage;
