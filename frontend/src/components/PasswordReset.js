import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PasswordReset() {
    var loginName;
    const [message, setMessage] = useState('');

    const doPasswordReset = async event => {
        event.preventDefault();
        setMessage('TO DO!')
    }
    
    return (
        <div className="container">
            <div className="row justify-content-center">
                <form onSubmit={doPasswordReset} style={{ maxWidth: '400px', margin: 'auto' }}>
                    <h2 className="text-center">Password Reset</h2>
                    <p style={{ textAlign: 'justify' }}>
                        Enter the email address associated with the account whose password you'd like to reset.
                        If there is an account associated with that email address, we will email you a link to reset your password.
                        Make sure to check your spam!
                    </p>
                    <div className="form-group">
                        <input type="text" className="form-control" id="loginName" placeholder="Email" ref={(c) => loginName = c} />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary mx-auto d-block">Submit </button>
                    </div>
                    <div className="form-group text-center">
                        <a href="../" className="btn btn-primary">Return to Login</a>
                    </div>
                </form>
                <div id="loginResult" className="red-text">{message}</div>
            </div>
        </div>
    );
}

export default PasswordReset;