import React from 'react';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import PasswordReset from '../components/PasswordReset';
import Navigation from '../components/Navigation'; 
import '../styles.css';

const PasswordResetPage = () => {
    return (
        <div style={{ backgroundColor: '#001C2C', height: '100vh'}}>
          <Navigation />
          <PageTitle />
          <Logo />
          <PasswordReset />
      </div>
      );
  };
  
export default PasswordResetPage;