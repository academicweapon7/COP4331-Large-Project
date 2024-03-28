import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeaderBoard = () => {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h2>Leaderboard</h2>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-7"> 
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>Number Correct</th>
                <th>Time</th> 
              </tr>
            </thead>
            <tbody>
              {[...Array(10)].map((_, index) => (
                <tr key={index + 1}>
                  <td>{index + 1}</td>
                  <td></td>
                  <td></td>
                  <td></td> 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderBoard;
