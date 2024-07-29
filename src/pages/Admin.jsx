import React from 'react';
import CreateMetric from '../components/CreateMetric';

const Admin = () => {
  return (
	<div className="admin-container">
      <div className="admin-box">
        <h1 className="admin-title">Admin Page</h1>
        <h3>Create new metric</h3>
        <CreateMetric />
      </div>
    </div>
  );
};

export default Admin;