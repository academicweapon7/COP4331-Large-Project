import React, { useState, useEffect } from 'react';
import FetchAccount from './FetchAccount'; 
import EditAccount from './EditAccount'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Account() {
    const [accountData, setAccountData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchAccount();
                setAccountData(data);
                setIsLoading(false);
            } catch (error) {
                setError('Error fetching account data.');
                setIsLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAccountData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { login, email, password } = accountData;
            const response = await EditAccount(accountData.id, login, email, password);
            if (!response.error) {
                console.log('Account edited successfully:', response);
            } else {
                setError(response.error);
            }
        } catch (error) {
            setError('editing account.');
        }
    };

    const inputStyle = {
        fontFamily: 'sans-serif', 
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="login" 
                            value={accountData?.login || ''}
                            onChange={handleInputChange}
                            className="form-control"
                            style={inputStyle}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={accountData?.email || ''}
                            onChange={handleInputChange} 
                            className="form-control"
                            style={inputStyle}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
            )}
        </div>
    );
}

export default Account;