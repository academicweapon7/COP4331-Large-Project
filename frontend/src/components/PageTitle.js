import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../images/steamGuruUpscaled.png'; 

function PageTitle() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <img src={logo} alt="Logo" style={{ width: '50px', marginRight: '20px' }} />
            <h1 style={{ color: 'white', fontSize: '5rem', margin: '0' }}>Steam Guru</h1>
            <img src={logo} alt="Logo" style={{ width: '50px', marginLeft: '20px' }} />
        </div>
    );
}

export default PageTitle;
