import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
} from 'chart.js';
// import 'chartjs-adapter-date-fns'
import 'chartjs-adapter-moment';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const TimeSeriesChart = ({ data }) => {
  const options = {
    scales: {
      x: {
        type: 'time',
        time: {
          unit: 'day'
        }
      },
      y: {
        beginAtZero: true
      }
    }
  };

  const chartData = {
    datasets: [
      {
        label: 'Data',
        data: data,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };
  
  return (
    <div className="chart-container">
      <Line options={options} data={chartData} />
    </div>
  );
};

export default TimeSeriesChart;