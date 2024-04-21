import React from 'react';

const Logo = () => {
    const logoContainerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const imgStyle = {
        width: '70%',
        height: 'auto',
    };

    return (
        <div style={logoContainerStyle}>
            <img src={require("../images/steamGuruUpscaled.png")} alt="Logo" className="logo-img img-fluid" style={imgStyle} />
        </div>
    );
}

export default Logo;
