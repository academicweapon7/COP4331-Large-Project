import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/steamGuruUpscaled.png'; 

function PageTitle() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
            <h1 style={{ color: 'white', fontSize: '3rem' }}>Steam Guru</h1>
            <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '10px' }} />
        </div>
    );
}

export default PageTitle;
