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
            if( res.id <= 0 )
            {
                setMessage('User/Password combination incorrect');
            }
            else
            {
                var user = {firstName:res.firstName,lastName:res.lastName,id:res.id}
                localStorage.setItem('user_data', JSON.stringify(user));
                setMessage('');
                window.location.href = '/cards';
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
                <div className="col-md-2">
                    <form onSubmit={doLogin}>
                        <h2 className="text-center mb-3">Login</h2>
                        <div className="form-group">
                            <input type="text" className="form-control" id="loginName" placeholder="Username" ref={(c) => loginName = c} />
                        </div>
                        <div className="form-group mb-3">
                            <input type="password" className="form-control" id="loginPassword" placeholder="Password" ref={(c) => loginPassword = c} />
                        </div>
                        <div className="form-group text-center">
                            <button type="submit" className="btn btn-primary mx-auto d-block">Login</button>
                        </div>
                    </form>
                    <div id="loginResult" className="mt-3 text-center">{message}</div>
                </div>
            </div>
        </div>

    );
};
export default Login;
