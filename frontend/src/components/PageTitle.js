import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageTitle() 
{
    const handleHomeClick = () => 
    {
        window.location.href = '/';    
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <button onClick={handleHomeClick} className="btn btn-secondary">
                        Home
                    </button>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                    <h1>Steam Guru</h1>
                </div>
            </div>
        </div>
    );
};

export default PageTitle;
