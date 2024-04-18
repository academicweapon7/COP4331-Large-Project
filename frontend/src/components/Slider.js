import React from 'react';

const Slider = ({ showLogin, handleToggleForm }) => {
    return (
        <div className="slider">
            <button
                className={`btn ${showLogin ? 'active' : ''}`}
                onClick={() => handleToggleForm('login')}
                style={{
                    backgroundColor: showLogin ? '#777' : 'white',
                    color: showLogin ? 'white' : 'black'
                }}
            >
                Login
            </button>
            <button
                className={`btn ${!showLogin ? 'active' : ''}`}
                onClick={() => handleToggleForm('register')}
                style={{
                    backgroundColor: !showLogin ? '#777' : 'white',
                    color: !showLogin ? 'white' : 'black'
                }}
            >
                Register
            </button>
        </div>
    );
};

export default Slider;
