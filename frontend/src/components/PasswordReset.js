import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PasswordReset() {
    var bp = require('./Path.js');
    var userEmail;
    const [message, setMessage] = useState('');

    const doPasswordReset = async (event) => {
        event.preventDefault();
    
        const emailInput = document.getElementById('userEmail');
        const email = emailInput.value.trim(); 
    
        const obj = { email }; 
        const js = JSON.stringify(obj);
    
        try {
            const response = await fetch(bp.buildPath('api/forgotpassword'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' },
            });
            const res = await response.json();
    
            if (!res.error) {
                setMessage('');
            } else {
                setMessage(res.error);
            }
        } catch (e) {
            alert(e.toString());
            return;
        }
    };
    

    return (
        <div className="container">
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
                                <input type="text" className="form-control" id="userEmail" placeholder="Email" ref={(c) => (userEmail = c)} style={{ fontFamily: 'Arial, Helvetica, sans-serif' }} />
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary mx-auto d-block">Submit</button>
                            </div>
                            <div className="form-group text-center">
                                <a href="../" className="btn btn-secondary">Return to Login</a>
                            </div>
                        </form>
                        <div id="loginResult" className="red-text text-center">{message}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PasswordReset;
