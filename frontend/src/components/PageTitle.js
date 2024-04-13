import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function PageTitle() 
{
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-md-6">
                    <div className="form-group text-center">
                        <a href="/" className="btn btn-secondary">Home</a>
                    </div>                    
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
