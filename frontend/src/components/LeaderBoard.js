import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

// const data = [
//     { name: "Anom", age: 19, gender: "Male" },
//     { name: "Megha", age: 19, gender: "Female" },
//     { name: "Subham", age: 25, gender: "Male" },
// ]

const Leaderboard = () => {
    const [leaderboardData, setLeaderboardData] = useState([])

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
                    alert(error.toString())
                }
                setLeaderboardData(results)
            } catch(e) {
                alert(e.toString())
            }
        }

        doLeaderboard()
    }, [])
    
    return(
        <div className='container text-center'>
                <h2>Leaderboard</h2>
            <table className='table table-striped table-dark table-bordered'>
                <thead clas = "thead-dark">
                    <tr>
                        <th scope='col'>#</th>
                        <th scope='col'>Username</th>
                        <th scope='col'>High Score</th>
                        <th scope='col'>Accuracy</th>
                        <th scope='col'>Streak</th>
                    </tr>
                </thead>
                <tbody>
                    {leaderboardData.map((val, key) => (
                        <tr key={key}>
                            <th scope="row">{key + 1}</th>
                            <td>{val.login}</td>
                            <td>{val.highscore}</td>
                            <td>{((val.rounds_won / val.rounds_played) * 100).toFixed(2)}</td>
                            <td>{val.streak}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Leaderboard;
