import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const Logo = () => 
{
    return (
        <div className="d-flex justify-content-center align-items-center">
            <img src={require("../images/steamGuru.png")} alt="Logo" className="logo-img img-fluid" style={{ maxWidth: "100px" }} />
        </div>
    );
}

export default Logo;
