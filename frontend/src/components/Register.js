import React, { useState } from 'react';

function Register()
{
    var registerEmail;
    var registerLogin;
    var registerPassword;
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

    const doRegister = async event =>
    {
        event.preventDefault();
        var obj = { login: registerLogin.value,
                    password : registerPassword.value,
                    email : registerEmail.value};
        var js = JSON.stringify(obj);
        try
        {
            const response = await fetch(buildPath('api/register'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });
            var res = JSON.parse(await response.text());
            if( res.id >= 0 )
            {
                setMessage('Username already in use');
            }
            else
            {
                setMessage('');
                window.location.href = '/';
            }
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }
    };

    return(
        <div id="registerDiv">
        <form onSubmit={doRegister}>
        <span id="inner-title">Register</span><br />
        <input type="text" id="registerLogin" placeholder="Username"
        ref={(c) => registerLogin = c} /><br />
        <input type="password" id="registerPassword" placeholder="Password"
        ref={(c) => registerPassword = c} /><br />
        <input type="text" id="registerEmail" placeholder="Email"
        ref={(c) =>  registerEmail = c} /><br />
        <input type="submit" id="loginButton" class="buttons"
        value = "Sign Up"
        onClick={doRegister} />
        </form>
        <span id="registerResult">{message}</span>
        </div>
    );
};

export default Register;