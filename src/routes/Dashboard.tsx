/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, FormEvent, useContext } from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div>
       <h1>Dashboard</h1>
       <div>
        <Link to="/plans">Plans</Link>
       </div>
       <div>
        <Link to="/purchases">Purchases</Link>
       </div>
    </div>
    
  );
}

export default Dashboard;
