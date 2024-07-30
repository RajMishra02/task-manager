import React from 'react';
import TaskReportForm from './TaskReportForm';
import Navbar from './Navbar';
import "../style/Dashboard.css";




const Dashboard = () => {
    return (
    <div className="dashboard-container">
      <Navbar />
      <h2 className="dashboard-header">Task Report</h2>
      <TaskReportForm />
    </div>
  );
};

export default Dashboard;
