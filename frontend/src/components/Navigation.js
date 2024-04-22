import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() 
{
    const location = useLocation();
    const showAccountLink = location.pathname === '/leaderboard';

    return (
        <div>
            <Link to="/" className="btn btn-secondary">Home</Link>
            <Link to="/aboutus" className="btn btn-secondary">About Us</Link>
            {showAccountLink && <Link to="/account" className="btn btn-secondary">Account</Link>}
        </div>
    );
}

export default Navigation;
