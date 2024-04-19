import React from 'react';

const Logo = () => {
    const logoContainerStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center', 
        position: 'fixed', 
        left: '25%', 
        top: '50%', 
        transform: 'translate(-50%, -50%)',
        zIndex: -1,
        backgroundColor: '#001C2C',
        padding: '1000px'
    };

    const imgStyle = {
        maxWidth: '800px'
    };

    return (
        <div style={logoContainerStyle}>
            <img src={require("../images/steamGuruUpscaled.png")} alt="Logo" className="logo-img img-fluid" style={imgStyle} />
        </div>
    );
}

export default Logo;
