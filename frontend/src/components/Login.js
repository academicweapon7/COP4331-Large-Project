import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


function Login()
{
    var loginName;
    var loginPassword;
    const [message,setMessage] = useState('');

    const app_name = 'steamguru-77d4152ed074'
    function buildPath(route)
    {
        if (process.env.NODE_ENV === 'production')
        {
        return 'https://' + app_name + '.herokuapp.com/' + route;
        }
        else
        {
            return 'http://localhost:5000/' + route;
        }
    }

    const doLogin = async event =>
    {
        event.preventDefault();

        if (!loginName.value && !loginPassword.value) {
            setMessage('Please fill in all fields');
            return;
        }

        if (!loginName.value) {
            setMessage('Username required');
            return;
        }

        if (!loginPassword.value) {
            setMessage('Password required');
            return;
        }

        var obj = {login:loginName.value,password:loginPassword.value};
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath('api/login'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });
            var res = JSON.parse(await response.text());
            if(!res.error)
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/leaderboard';
            }
            else
            {
                setMessage(res.error);
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(

        <div className="container">
            <div className="row justify-content-center">
                    <form onSubmit={doLogin}>
                        <h2 className="text-center">Login</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" id="loginName" placeholder="Username" ref={(c) => loginName = c} />
                        </div>
                        <div className="form-group text-center">
                            <input type="password" className="form-control" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary mx-auto d-block">Login</button>
                        </div>
                    </form>
                    <div id="loginResult" className="red-text">{message}</div>
            </div>
        </div>
    );
};
export default Login;