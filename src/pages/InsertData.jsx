import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Instructions from '../components/Instructions';
import axios from 'axios';
import './InsertData.css';


const InsertData = () => {
  const location = useLocation();
  const { metric } = location.state || {};
  const [csvData, setCsvData] = useState('');
  const navigate = useNavigate();
  

  const handleCsvChange = (e) => {
      setCsvData(e.target.value);
    };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.put('http://localhost:8080/metric/insert-data', { metricName: metric.metricName, csvData }, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`,
            'Content-Type': 'application/json',
          },
        });
        navigate('/admin');
      } catch (error) {
        console.error('Error inserting data:', error);
      }
  };


  return (
    <div>
    <h1 className='insert-data-h1'>Insert Data</h1>
    <div className="insert-data-container">
    
      <Instructions />
      <div className="content-container">

        {metric && (
          <div className="metric-reference">
            <h2>Metric: {metric.metricName}</h2>
            <ul>
              {Object.entries(metric.columns).map(([columnName, columnType], idx) => (
                <li key={idx}>{`${columnName}: ${columnType}`}</li>
              ))}
            </ul>
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            className="csv-textarea"
            value={csvData}
            onChange={handleCsvChange}
            placeholder="Paste your CSV data here"
          />
          <div className="button-container">
            <button type="submit" className="submit-button">Insert data</button>
          </div>
        </form>
      </div>
    </div>
    </div>
  );
};

export default InsertData;