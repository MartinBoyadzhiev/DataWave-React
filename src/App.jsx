import React, { useEffect } from 'react';
import './App.css';
import { useState } from 'react';

import { fetchTimeSeriesData } from './api/DataService';
import TimeSeriesChart from './components/TimeseriesChart';


function App() {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    const response = await fetchTimeSeriesData();

    if (response.data) {
      setData(response.data.map(item => ({
        x: item.timestamp,
        y: item.value
      })));
    }
  }

  return (
    <div className="App">
      <div className="chart-container">
        <TimeSeriesChart data={data} />
        <button onClick={fetchData}>Fetch Data</button>
      </div>

    </div>
  );
}

export default App
