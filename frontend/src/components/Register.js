import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Register() {

    var bp = require('./Path.js');

    const [message, setMessage] = useState('');
    let registerEmail, registerLogin, registerPassword;

    const doRegister = async event => {
        event.preventDefault();

        if (!registerLogin.value && !registerPassword.value && !registerEmail.value) {
            setMessage('Please fill in all fields');
            return;
        }

        if (!registerLogin.value) {
            setMessage('Username required');
            return;
        }

        if (!registerPassword.value) {
            setMessage('Password required');
            return;
        }

        if (!registerEmail.value) {
            setMessage('Email required');
            return;
        }

        var obj = {
            login: registerLogin.value,
            password: registerPassword.value,
            email: registerEmail.value
        };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/register'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
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

    return (
        <div className="container">
            <div className="row justify-content-center">
                    <div id="registerDiv">
                        <form onSubmit={doRegister}>
                            <h2 className="text-center">Register</h2>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerLogin"
                                    placeholder="Username"
                                    ref={(c) => (registerLogin = c)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="registerPassword"
                                    placeholder="Password"
                                    ref={(c) => (registerPassword = c)}
                                />
                            </div>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="registerEmail"
                                    placeholder="Email"
                                    ref={(c) => (registerEmail = c)}
                                />
                            </div>
                            <div className="form-group text-center">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                >
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
    );
}

export default Register;
