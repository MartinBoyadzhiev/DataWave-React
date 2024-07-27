import React, { useState, useEffect } from 'react';
import TimeSeriesChart from '../components/TimeSeriesChart';
import '../components/TimeSeriesChart.css';
import { fetchTimeSeriesData, fetchColumnNames } from '../api/DataService';
import ColumnNames from '../components/Columns';

const Data = () => {
  const [data, setData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);

  const fetchData = async () => {
	const response = await fetchTimeSeriesData();
	if (response.data) {
	  setData(response.data.map(item => ({
		x: item.timestamp,
		y: item.value
	  })));
	}
  };

  const fetchColumns = async () => {
	const response = await fetchColumnNames();
	if (response.data) {
	  setColumnNames(response.data);
	}
  };

  useEffect(() => {
	fetchColumns();
  }, []);

  return (
	<div className="chart-container">
	  <TimeSeriesChart data={data} />
	  <ColumnNames columnNames={columnNames} />
	  <button onClick={fetchData} className='fetch-button'>Fetch Data</button>
	</div>
  );
};

export default Data;