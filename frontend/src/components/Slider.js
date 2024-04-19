import React from 'react';

const Slider = ({ showLogin, handleToggleForm }) => {
    const sliderStyle = {
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed', 
        left: '70%', 
        top: '30%', 
        transform: 'translate(-50%, -50%)',
        zIndex: 1, 
    };

    const buttonStyle = {
        padding: '12px 24px',
        fontSize: '16px', 
    };

    return (
        <div className="slider" style={sliderStyle}>
            <button
                className={`btn ${showLogin ? 'active' : ''}`}
                onClick={() => handleToggleForm('login')}
                style={{
                    ...buttonStyle,
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
                    ...buttonStyle,
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
