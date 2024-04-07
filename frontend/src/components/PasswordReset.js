import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PasswordReset()
{
    var loginName;
    const [message, setMessage] = useState('');

    const doPasswordReset = async event =>
    {
        event.preventDefault();
        setMessage('TO DO!')
    }
    
    return(
        <div className="container">
        <div className="row justify-content-center">
                <form onSubmit={doPasswordReset}>
                    <h2 className="text-center">Password Reset</h2>
                        <p>Enter the email address accociated with the account who's password 
                           you'd like to reset. If there is an account associated with that email
                           address, we will email you a link to reset your password. Make sure to
                           check you spam!</p>
                    <div className="form-group">
                        <input type="text" className="form-control" id="loginName" placeholder="Username" ref={(c) => loginName = c} />
                    </div>
                    <div className="form-group text-center">
                        <button type="submit" className="btn btn-primary mx-auto d-block">Submit </button>
                    </div>
                    <div className="form-group text-center">
                        <a href="../" class="btn btn-primary">Return to Login</a>
                    </div>
                </form>
                <div id="loginResult" className="red-text">{message}</div>
        </div>
    </div>
    );
}

export default PasswordReset;