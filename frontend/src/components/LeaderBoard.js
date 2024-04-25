import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchAccount from './FetchAccount.js';

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([])
    const [positionData, setPosition] = useState(null)
    const [accountData, setAccountData] = useState(null)

    useEffect(() => {
        var email = localStorage.getItem('userEmail');
        const fetchAccountData = async () => {
            try {
                const bp = require('./Path.js')
                var obj = {
                    email: email
                };
                const js = JSON.stringify(obj);
                // Fetch account data
                const response = await fetch(bp.buildPath('api/getposition'),
                {
                    method: 'POST',
                    body: js,
                    headers: { 'Content-Type': 'application/json' }
                });
                const { position, error } = await response.json()
                if (error) {
                    console.log('Error:', error)
                }
                setPosition(position);
                const accountData = await FetchAccount()
                setAccountData(accountData);
            } catch (error) {
                console.error('Error fetching account data:', error)
            }
        };
    
        fetchAccountData();
    }, []);

    useEffect(() => {
        const doLeaderboard = async () => {
            try {
                const bp = require('./Path.js')
                var obj = {
                    top: 1,
                    bottom: 10
                }
                const js = JSON.stringify(obj)
                const response = await fetch(bp.buildPath('api/getleaderboard'),
                {
                    method: 'POST',
                    body: js,
                    headers: {'Content-Type' : 'application/json'}
                })
                const {results, error} = await response.json()
                console.log('Result:', results)
                console.log('Error:', error)
                if (error) {
                    console.log(error.toString())
                }
                setLeaderboardData(results)
            } catch(e) {
                console.log(e.toString())
            }
        }

        doLeaderboard()
    }, [])
    
    return (
        <div className='container text-center'>
            <h2 style={{ color: 'white' }}>Your Stats</h2>
            {accountData && (
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
            )}

            <h2 style={{ color: 'white' }}>Leaderboard</h2>
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
                    {leaderboardData.map((val, key) => (
                        <tr key={key}>
                            <th scope="row">{key + 1}</th>
                            <td>{val.login}</td>
                            <td>{val.highscore}</td>
                            <td>{val.rounds_played}</td>
                            <td>{((val.rounds_won / val.rounds_played) * 100).toFixed(2)}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
    
export default Leaderboard;