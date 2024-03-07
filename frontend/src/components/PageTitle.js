import React from 'react';

function PageTitle()
{
    const handleHomeClick = () => {
        window.location.href = '/';    
    };

    return(
        <div>
            <button onClick={handleHomeClick}>
                Home
            </button>
            <h1>Steam Guru</h1>
        </div>  
    );
};

export default PageTitle;