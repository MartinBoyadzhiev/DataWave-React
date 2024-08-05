import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import TimeSeriesChart from '../components/TimeSeriesChart';
import '../components/TimeSeriesChart.css';
import { fetchTimeSeriesData, fetchColumnNames } from '../api/DataService';
import ColumnNames from '../components/Columns';

const Data = () => {
  const [data, setData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const location = useLocation();
  const { metric } = location.state || {};
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(JSON.parse(localStorage.getItem('isAdmin')));
  }, []);

  const fetchData = async () => {
	const response = await fetchTimeSeriesData(metric.metricName);
	if (response.data) {
	  setData(response.data.map(item => ({
		x: item.timestamp,
		y: item.value
	  })));
	}
  };

  const fetchColumns = async () => {
	const response = await fetchColumnNames(metric.metricName);
	if (response.data) {
	  setColumnNames(response.data);
	}
  };

  const handleInsertData = () => {
    navigate('/admin/insert', { state: { metric} });
  }

  useEffect(() => {
	fetchData();
	fetchColumns();
  }, []);

  return (
	<div className="chart-container">
	  <TimeSeriesChart data={data} />
	  <ColumnNames columnNames={columnNames} />
	  <button onClick={fetchData} className='fetch-button'>Fetch Data</button>
	  {isAdmin && (
        <button onClick={handleInsertData} className='insert-button-data'>Insert Data</button>
      )}
	</div>
  );
};

export default Data;