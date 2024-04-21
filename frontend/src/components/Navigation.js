import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navigation() {
    return (
        <div>
            <a href="/" className="btn btn-secondary">Home</a>
            <a href="/aboutus" className="btn btn-secondary">About Us</a>
        </div>
    );
}

export default Navigation;
