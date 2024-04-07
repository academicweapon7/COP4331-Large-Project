import React from 'react';
import PageTitle from '../components/PageTitle';
import Logo from '../components/Logo';
import PasswordReset from '../components/PasswordReset';

const PasswordResetPage = () => {
    return (
      <div>
          <PageTitle />
          <Logo />
          <div className="container">
              <div className="row justify-content-center">
                  <div className="col-md-5">
                      <PasswordReset />
                  </div>
              </div>
          </div>
      </div>
      );
  };
  
export default PasswordResetPage;