import React, { useState } from 'react';
import PasswordChecklist from 'react-password-checklist';
import 'bootstrap/dist/css/bootstrap.min.css';
const crypto = require('crypto');

function Register() {
    var bp = require('./Path.js');

    const [message, setMessage] = useState('');
    var registerUsername;
    var registerEmail;
    const [password, setPassword] = useState('');
    const [passwordAgain, setPasswordAgain] = useState('');

    const isValidPassword = (password) => {
        return password.length >= 8 && /[!@#$%^&*]/.test(password) && /\d/.test(password) && /[A-Z]/.test(password);
    };

    const isValidEmail = (email) => {
        const regex = /^.+@.+\..+$/;
        return regex.test(email);
    };

    const doRegister = async (event) => {
        event.preventDefault();

        // Check if all fields are filled
        if (!registerUsername || !password || !registerEmail) {
            setMessage('Please fill in all fields!');
            return;
        }

        // Check if passwords match
        if (password !== passwordAgain) {
            setMessage('Passwords do not match!');
            return;
        }

        // Check if password meets the required criteria
        if (!isValidPassword(password)) {
            setMessage('Password does not meet the requirements!');
            return;
        }

        // Check if email is valid
        if (!isValidEmail(registerEmail.value)) {
            setMessage('Invalid email!');
            return;
        }

        var obj = {
            login: registerUsername.value,
            password: password,
            email: registerEmail.value,
        };

        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/register'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' },
            });
            var res = JSON.parse(await response.text());
            if (!res.error) {
                setMessage('');
                window.location.href = '/';
            } else {
                setMessage(res.error);
            }
        } catch (e) {
            alert(e.toString());
            return;
        }
    };

    const inputStyle = {
        fontFamily: 'sans-serif', 
    };

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card p-4">
                        <form onSubmit={doRegister}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerUsername"
                                    placeholder="Username"
                                    ref={(c) => (registerUsername = c)}
                                    style={inputStyle} 
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    style={inputStyle} 
                                />
                                <input
                                    type="password"
                                    className="form-control"
                                    placeholder="Re-enter Password"
                                    onChange={(e) => setPasswordAgain(e.target.value)}
                                    style={inputStyle} 
                                />
                                <PasswordChecklist
                                    rules={['minLength', 'specialChar', 'number', 'capital', 'match']}
                                    minLength={8}
                                    value={password}
                                    valueAgain={passwordAgain}
                                    onChange={(isValid) => {}}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerEmail"
                                    placeholder="Email"
                                    ref={(c) => (registerEmail = c)}
                                    style={inputStyle} 
                                />
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary">
                                    Sign Up
                                </button>
                            </div>
                        </form>
                        <div className="red-text" id="registerResult">
                            {message}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
