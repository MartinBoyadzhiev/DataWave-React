import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './MetricOverview.css';
import ConfirmationDialog from './ConfirmationDialog';
import { useNavigate } from 'react-router-dom';
import { useAccessControl } from '../context/AccessControllContext';
import ErrorPopUp from '../components/ErrorPopUp';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

const MetricsOverview = ({isAdmin}) => {
    const navigate = useNavigate();
    const {setCanAccessData} = useAccessControl();
    const [metrics, setMetrics] = useState([]);
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [metricToDelete, setMetricToDelete] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { t } = useTranslation();

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
            setErrorMessage(error.response.data.message);
        }
    };

    const handleDisplayData = async (metric) => {
        setCanAccessData(true);
        try {
            const token = localStorage.getItem('jwtToken');
            await axios.put(`http://localhost:8080/metric/statistics`,null, {
                headers: {
                    Authorization: `Bearer ${token}`
                },
                params: {
                    metricName: metric.metricName
                }
            });
            navigate(`/data`, { state: { metric } });
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    const handleInsertData = (metric) => {
        navigate(`/admin/insert`, { state: { metric } });
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
            setMetrics(metrics.filter(metric => metric.metricName !== metricName));
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    const handleCloseErrorPopup = () => {
        setErrorMessage('');
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
                    <button className="display-button" onClick={() => handleDisplayData(metric)}>{t('display')}</button>
                    {isAdmin && (
                        <>
                            <button className="insert-button" onClick={() => handleInsertData(metric)}>{t('insert')}</button>
                            <button className="delete-button" onClick={() => confirmDeleteMetric(metric.metricName)}>{t('delete')}</button>
                        </>
                        )}
                </div>
            ))}
            {showConfirmDialog && (
                <ConfirmationDialog
                    message= {<Trans i18nKey="deleteMetricConfirmation" values={{ metricName: metricToDelete }} />}
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
            {errorMessage && <ErrorPopUp message={errorMessage} onClose={handleCloseErrorPopup} />}
        </div>
    );
};

export default MetricsOverview;