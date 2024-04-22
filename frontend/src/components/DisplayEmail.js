import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DisplayEmail() {
    var email = localStorage.getItem('userEmail');

    return (
        <div style={{ 
            color: 'white',
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            fontSize: '24px',
            paddingRight: '5px'
        }}>
            {email}
        </div>
    );
}

export default DisplayEmail;
