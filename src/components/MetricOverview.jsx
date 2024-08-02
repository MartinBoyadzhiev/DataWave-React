import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MetricOverview.css';
import ConfirmationDialog from './ConfirmationDialog';

const MetricsOverview = ({isAdmin}) => {
    const [metrics, setMetrics] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [metricToDelete, setMetricToDelete] = useState(null);

    useEffect(() => {
        fetchMetrics();
    }, []);

    const fetchMetrics = async () => {
        try {
            const token = localStorage.getItem('jwtToken');
            const response = await axios.get('http://localhost:8080/metric/overview', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setMetrics(response.data);
        } catch (error) {
            console.error('Error fetching metrics:', error);
        }
    };

    const handleDisplayData = (metricName) => {
        console.log(`Display data for ${metricName}`);
        // Add your logic to display data for the metric
    };

    const handleDeleteMetric = async (metricName) => {
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.delete(`http://localhost:8080/metric/delete`, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    metricName: metricName
                }
            });
            // Update the state to remove the deleted metric
            setMetrics(metrics.filter(metric => metric.metricName !== metricName));
        } catch (error) {
            console.error('Error deleting metric:', error);
        }
    };

    const confirmDeleteMetric = (metricName) => {
        setMetricToDelete(metricName);
        setShowConfirmDialog(true);
    }

    const handleConfirmDelete = () => {
        if (metricToDelete) {
            handleDeleteMetric(metricToDelete);
        }
        setShowConfirmDialog(false);
        setMetricToDelete(null);
    };

    const handleCancelDelete = () => {
        setShowConfirmDialog(false);
        setMetricToDelete(null);
    };

    return (
        <div className="metric-overview-container">
            {metrics.map((metric, index) => (
                <div key={index} className="metric-item">
                    <h4>{metric.metricName}</h4>
                    <ul>
                        {Object.entries(metric.columns).map(([columnName, columnType], idx) => (
                            <li key={idx}>{`${columnName}: ${columnType}`}</li>
                        ))}
                    </ul>
                    <button className="display-button" onClick={() => handleDisplayData(metric.metricName)}>Display</button>
                    {isAdmin && (
                        <button className="delete-button" onClick={() => confirmDeleteMetric(metric.metricName)}>Delete</button>
                    )}
                </div>
            ))}
            {showConfirmDialog && (
                <ConfirmationDialog
                    message={`Are you sure you want to delete the metric "${metricToDelete}"?`}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
};

export default MetricsOverview;