import React, { useState, useEffect } from 'react';
import FetchAccount from './FetchAccount'; 
import EditAccount from './EditAccount'; 
import 'bootstrap/dist/css/bootstrap.min.css';

function Account() {
    var bp = require('./Path.js');
    const [accountData, setAccountData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPasswords, setShowNewPasswords] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await FetchAccount();
                setAccountData(data);
                setIsLoading(false);
            } catch (error) {
                setError('Error: fetching account data');
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

        const {id, login , password, newPassword} = accountData;

        var updatedPassword = password;

        if (newPassword !== null && newPassword !== '' && newPassword !== undefined)
        {
            updatedPassword = newPassword;
        }

        var obj = { userId: id, username: login, password: updatedPassword };
        var js = JSON.stringify(obj);

        try {
            const response = await fetch(bp.buildPath('api/editaccount'), {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });

            if (!response.error) 
            {
                localStorage.setItem('userLogin', accountData.login);
                window.location.reload();
            } 
            else 
            {
                setError(response.error);
            }
        } catch (error) {
            setError('Error: Unable to Change');
        }
    };

    const toggleShowCurrentPassword = () => {
        setShowCurrentPassword((prevShowCurrentPassword) => !prevShowCurrentPassword);
    };

    const toggleShowNewPasswords = () => {
        setShowNewPasswords((prevShowNewPasswords) => !prevShowNewPasswords);
    };

    const inputStyle = {
        fontFamily: 'sans-serif', 
    };

    return (
        <div className="row justify-content-center">
            <div className="col-md-3">
                <div className="card p-4">
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        {isLoading ? (
                            <p>Loading...</p>
                        ) : (
                            <form onSubmit={handleSubmit}>
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
                                    <label htmlFor="oldPassword">Current Password:</label>
                                    <input
                                        type={showCurrentPassword ? 'text' : 'password'}
                                        id="oldPassword"
                                        name="oldPassword"
                                        value={accountData?.password || ''}
                                        className="form-control"
                                        style={inputStyle}
                                        readOnly
                                    />
                                    <button type="button" onClick={toggleShowCurrentPassword} className="btn btn-secondary btn-sm mt-2">{showCurrentPassword ? 'Hide' : 'Show'}</button>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="newPassword">New Password:</label>
                                    <input
                                        type={showNewPasswords ? 'text' : 'password'}
                                        id="newPassword"
                                        name="newPassword"
                                        value={accountData?.newPassword || ''}
                                        onChange={handleInputChange}
                                        className="form-control"
                                        style={inputStyle}
                                    />
                                    <button type="button" onClick={toggleShowNewPasswords} className="btn btn-secondary btn-sm mt-2">{showNewPasswords ? 'Hide' : 'Show'}</button>
                                </div>
                                <div className="form-group text-center">
                                    <div>
                                        <button type="submit" className="btn btn-primary btn-block">Save</button>
                                    </div>
                                </div>
                                <div className="form-group text-center">
                                    {error && <p style={{ color: 'red' }}>{error}</p>}
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
