import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PasswordReset() {
    var loginName;
    const [message, setMessage] = useState('');

    const doPasswordReset = async (event) => {
        event.preventDefault();
        setMessage('TO DO!');
    };

    return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
            <style>
                {`
                    .custom-card {
                        position: relative;
                        margin-top: -300px; 
                    }
                `}
            </style>
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card p-3 custom-card">
                        <form onSubmit={doPasswordReset}>
                            <h2 className="text-center">Password Reset</h2>
                            <p style={{ textAlign: 'justify' }}>
                                Enter the email address associated with the account whose password you'd like to reset.
                                If there is an account associated with that email address, we will email you a link to reset your password.
                                Make sure to check your spam!
                            </p>
                            <div className="form-group">
                                <input type="text" className="form-control" id="loginName" placeholder="Email" ref={(c) => (loginName = c)} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} />
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary mx-auto d-block">Submit</button>
                            </div>
                            <div className="form-group text-center">
                                <a href="../" className="btn btn-secondary">Return to Login</a>
                            </div>
                        </form>
                        <div id="loginResult" className="red-text">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
