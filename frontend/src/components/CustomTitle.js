import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CustomTitle() {
    const titleStyle = {
        color: 'white',
        position: 'fixed', 
        left: '50%', 
        top: '10%', 
        width: 'fit-content',
    };

    return (
        <div style={titleStyle}>
            <h1 style={{ fontSize: '5em' }}>Steam Guru</h1>
        </div>
    );
}

export default CustomTitle;
