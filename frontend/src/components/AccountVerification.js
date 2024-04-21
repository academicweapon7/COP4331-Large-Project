import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles.css';

function AccountVerification() {
    var bp = require('./Path.js');
    var code;
    const email = localStorage.getItem('userEmail');
    const [message, setMessage] = useState('');

    const doAccountVerification = async (event) => {
        event.preventDefault();
        const verificationCode = code.value.trim(); 

        if (!verificationCode) {
            setMessage('Verification code cannot be empty.');
            return;
        }

        var obj = { email: email, verif_code: verificationCode };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/verifyaccount'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });

            const res = await response.json();

            if (res.verif_success) {
                setMessage('Verification successful!');
                window.location.href = '/leaderboard';
            } else {
                setMessage(res.error);
            }
        } catch (error) {
            setMessage('Error verifying account. Please try again later.');
        }
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card p-3 custom-card">
                        <form onSubmit={doAccountVerification}>
                            <h2 className="text-center">Account Verification</h2>
                            <p style={{ textAlign: 'justify' }}>
                                Check your email for verification code!
                            </p>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="code"
                                    placeholder="Verification Code"
                                    ref={(c) => (code = c)}
                                    style={{ fontFamily: 'Arial, Helvetica, sans-serif' }}
                                />
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary mx-auto d-block">
                                    Submit
                                </button>
                            </div>
                            <div className="form-group text-center">
                                <a href="../" className="btn btn-secondary">
                                    Return to Login
                                </a>
                            </div>
                        </form>
                        <div id="loginResult" className="red-text text-center">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AccountVerification;
