import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function CreateCode() {
    var bp = require('./Path.js');
    const [message, setMessage] = useState('');
    const email = localStorage.getItem('userEmail');
    const verif_code = Math.floor(Math.random() * 90000) + 10000;

    const doCreateCode = async (event) => {

        var obj = {
            email: email,
            verif_code: verif_code,
        };

        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/createcode'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' },
            });
            var res = JSON.parse(await response.text());

            if (!res.error) {
                setMessage('');
            } else {
                setMessage(res.error);
            }
        } catch (e) {
            alert(e.toString());
            return;
        }
    };

    useEffect(() => {
        doCreateCode(); 
    }, []); 
    
    
    return (
        <div>
            {message}
        </div>
    );
}

export default CreateCode;
