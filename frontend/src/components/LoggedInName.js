import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function LoggedInName()
{
    var _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    var userId = ud.id;
    //var userName = ud.userName

    const doLogout = event =>
    {
        event.preventDefault();
        localStorage.removeItem("user_data")
        window.location.href = '/';
    };
    return(
        <div id="loggedInDiv">
        <span id="userName">Logged In As userName</span><br />
        <button type="button" id="logoutButton" class="buttons" onClick={doLogout}> Log Out </button>
        </div>
    );
};

export default LoggedInName;