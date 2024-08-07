import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Instructions from '../components/Instructions';
import axios from 'axios';
import './InsertData.css';
import ErrorPopUp from '../components/ErrorPopUp';
import { useTranslation } from 'react-i18next';
import { Trans } from 'react-i18next';

const InsertData = () => {
  const location = useLocation();
  const { metric } = location.state || {};
  const [csvData, setCsvData] = useState('');
  const [error, setError] = useState('');
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  

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
        navigate('/');
      } catch (error) {
        setError(t('insertError'));
        setShowErrorPopup(true);
      }
  };

  const handleClosePopup = () => {
    setShowErrorPopup(false);
  };

  return (
    <div>
    <h1 className='insert-data-h1'>{t('insertHeader')}</h1>
    <div className="insert-data-container">
      <Instructions />
      <div className="content-container">
        {metric && (
          <div className="metric-reference">
            <h2>{t('metric')}: {metric.metricName}</h2>
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
            placeholder={t('textBox')}
          />
          <div className="button-container">
            <button type="submit" className="submit-button">{t('insertButton')}</button>
          </div>
        </form>
      </div>
    </div>
    {showErrorPopup && <ErrorPopUp message={error} onClose={handleClosePopup} />}
    </div>
  );
};

export default InsertData;