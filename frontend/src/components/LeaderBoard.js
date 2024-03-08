import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaderBoard = () => 
{
  return (
    <div>
      <div className="row justify-content-center"> 
        <div className="col-12 text-center">
          <h2>Leaderboard</h2>
        </div>
      </div>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>#</th>
            <th>Player Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {[...Array(10)].map((_, index) => (
            <tr key={index + 1}>
              <td>{index + 1}</td>
              <td></td> 
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaderBoard;
