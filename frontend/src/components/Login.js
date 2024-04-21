import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    var bp = require('./Path.js');
    var loginName;
    var loginPassword;
    const [message, setMessage] = useState('');

    const doLogin = async event => {
        event.preventDefault();

        if (!loginName.value) {
            setMessage('Username required');
            return;
        }

        if (!loginPassword.value) {
            setMessage('Password required');
            return;
        }

        var obj = { login: loginName.value, password: loginPassword.value };
        var js = JSON.stringify(obj);
        try {
            const response = await fetch(bp.buildPath('api/login'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });
            var res = JSON.parse(await response.text());
            if (!res.error) {
                var user = { firstName: res.firstName, lastName: res.lastName, id: res.id };
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/leaderboard';
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
                <div className="col-md-4">
                    <div className="card p-4">
                        <form onSubmit={doLogin}>
                            <div className="form-group">
                                <input type="text" className="form-control" id="loginName" placeholder="Username" ref={(c) => loginName = c} style={inputStyle} />
                            </div>
                            <div className="form-group text-center">
                                <input type="password" className="form-control" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} style={inputStyle} />
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="btn btn-primary mx-auto d-block">Login</button>
                            </div>
                            <div className="form-group text-center">
                                <a href="/passwordreset">Forgot Password?</a>
                            </div>
                        </form>
                        <div id="loginResult" className="red-text">{message}</div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
