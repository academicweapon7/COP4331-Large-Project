import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
    const location = useLocation();
    const isHomePage = location.pathname === '/';
    const isAccountPage = location.pathname === '/account';
    const isLeaderboardPage = location.pathname === '/leaderboard';

    return (
        <div>
            <Link to="/" className="btn btn-secondary">{isAccountPage || isLeaderboardPage ? 'Sign Out' : 'Home'}</Link>
            {isHomePage && <Link to="/aboutus" className="btn btn-secondary">About Us</Link>}
            {isAccountPage && <Link to="/leaderboard" className="btn btn-secondary">Leaderboard</Link>}
            {isLeaderboardPage && <Link to="/account" className="btn btn-secondary">Account</Link>}
        </div>
    );
}

export default Navigation;
