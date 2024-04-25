import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchAccount from './FetchAccount.js';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [positionData, setPosition] = useState(null);
    const [accountData, setAccountData] = useState(null);
    const [sortBy, setSortBy] = useState('highscore'); // Default sorting by high score

    useEffect(() => {
        var email = localStorage.getItem('userEmail');
        const fetchAccountData = async () => {
            try {
                const bp = require('./Path.js');
                var obj = {
                    email: email
                };
                const js = JSON.stringify(obj);
                // Fetch account data
                const response = await fetch(bp.buildPath('api/getposition'), {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type': 'application/json' }
                });
                const { position, error } = await response.json();
                if (error) {
                    console.log('Error:', error);
                }
                setPosition(position);
                const accountData = await FetchAccount();
                setAccountData(accountData);
            } catch (error) {
                console.error('Error fetching account data:', error);
            }
        };
    
        fetchAccountData();
    }, []);

    // useEffect to fetch leaderboard data
    useEffect(() => {
        const doLeaderboard = async () => {
            try {
                const bp = require('./Path.js');
                var obj = {
                    top: 1,
                    bottom: 10,
                    parameter: sortBy // Send sorting parameter (0 or 1) to backend
                };
                const js = JSON.stringify(obj);
                const response = await fetch(bp.buildPath('api/getleaderboard'), {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type' : 'application/json' }
                });
                const { results, error } = await response.json();
                console.log('Result:', results);
                console.log('Error:', error);
                if (error) {
                    console.log(error.toString());
                    // If incorrect parameter, default to sorting by highscore
                    setSortBy(0);
                    return;
                }
                // Sort the results in descending order
                const sortedResults = results.sort((a, b) => {
                    if (sortBy === 0) {
                        return b.highscore - a.highscore;
                    } else if (sortBy === 1) {
                        return b.rounds_played - a.rounds_played;
                    }
                    return 0;
                });
                setLeaderboardData(sortedResults);
            } catch(e) {
                console.log(e.toString());
            }
        };

        doLeaderboard();
    }, [sortBy]);

    // Handle sorting change
    const handleSortChange = (param) => {
        if (param === 'highscore') {
            setSortBy(0);
        } else if (param === 'rounds_played') {
            setSortBy(1);
        }
    };

    return (
        <div className='container text-center'>
            {/* Your Stats section */}
            {accountData && (
                <div>
                    <h2 style={{ color: 'white' }}>Your Stats</h2>
                    <table className='table table-striped table-dark table-bordered'>
                        <thead className='thead-dark'>
                            <tr>
                                <th scope='col'>Position</th>
                                <th scope='col'>Username</th>
                                <th scope='col'>High Score</th>
                                <th scope='col'>Rounds Played</th>
                                <th scope='col'>Accuracy</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{positionData}</td>
                                <td>{accountData.login}</td>
                                <td>{accountData.highscore}</td>
                                <td>{accountData.rounds_played}</td>
                                <td>{((accountData.rounds_won / accountData.rounds_played) * 100).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            )}

            {/* Leaderboard section */}
            {/* Table headers with onClick to handle sorting */}
            <div>
                <h2 style={{ color: 'white' }}>Leaderboard</h2>
                <table className='table table-striped table-dark table-bordered'>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>Position</th>
                            <th scope='col'>Username</th>
                            <th scope='col' onClick={() => handleSortChange('highscore')}>High Score</th>
                            <th scope='col' onClick={() => handleSortChange('rounds_played')}>Rounds Played</th>
                            <th scope='col'>Accuracy</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Table rows with sorted data */}
                        {leaderboardData.map((val, key) => (
                            <tr key={key}>
                                <td>{key + 1}</td>
                                <td>{val.login}</td>
                                <td>{val.highscore}</td>
                                <td>{val.rounds_played}</td>
                                <td>{((val.rounds_won / val.rounds_played) * 100).toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
};
    
export default Leaderboard;
