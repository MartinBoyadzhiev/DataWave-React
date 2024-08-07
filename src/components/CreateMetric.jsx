import React, { useState } from 'react';
import axios from 'axios';
import './CreateMetric.css';
import { useTranslation } from 'react-i18next';

const CreateMetric = () => {
  const [metricName, setName] = useState('');
  const [valueType, setValue] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '' }]);
  const [primaryKeys, setPrimaryKeys] = useState([]);
  const [responseMessage, setResponseMessage] = useState(''); // State variable for response message
  const [validationError, setValidationError] = useState('');
  const { t } = useTranslation();


  const handleAddColumn = () => {
    setColumns([...columns, { name: '', type: '' }]);
  };
  
  const handleRemoveColumn = (index) => {
    const newColumns = columns.filter((_, i) => i !== index);
    setColumns(newColumns);
  };

  const handleColumnChange = (index, field, value) => {
    const newColumns = columns.map((column, i) => 
      i === index ? { ...column, [field]: value } : column
    );
    setColumns(newColumns);
  };

  const handlePrimaryKeyChange = (e) => {
    const { name, checked } = e.target;
    if (checked) {
      setPrimaryKeys([...primaryKeys, name]);
    } else {
      setPrimaryKeys(primaryKeys.filter(key => key !== name));
    }
  };

  const validateMetricName = (name) => {
    const alphanumericRegex = /^[a-z0-9]+$/i;
    if (!alphanumericRegex.test(name)) {
      setValidationError(t('validationError'));
      return false;
    }
    setValidationError('');
    return true;
  };


  
  const validateColumns = () => {
    const alphanumericRegex = /^[a-z0-9]+$/i;
    for (const column of columns) {
      if (!column.name || !column.type) {
        setValidationError(t('columnValidationError'));
        return false;
      }
      if (!alphanumericRegex.test(column.name)) {
        setValidationError(t('columnNameValidationError'));
        return false;
      }
    }
    setValidationError('');
    return true;
  };

  const handleMetricNameChange = (e) => {
    const { value } = e.target;
    setName(value);
    validateMetricName(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateMetricName(metricName) || !validateColumns()) {
      return;
    }

    const metricData = {
      metricName,
      valueType,
      columns: columns.reduce((acc, column) => {
        acc[column.name] = column.type;
        return acc;
      }, {}),
      primaryKeys
    };

    const token = localStorage.getItem('jwtToken');

    try {
      const response = await axios.post('http://localhost:8080/metric/create', metricData , {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setResponseMessage(t('metricCreated'));
        
        setName('');
        setValue('');
        setColumns([{ name: '', type: '' }]);
        setPrimaryKeys([]);
      }
      
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data.message); 
      } else {
        setResponseMessage(t('metricCreationError'));
      }
    }
  };

  return (
    <div className="create-metric-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="metricName">{t('metricName')} </label>
          <input
            type="text"
            id="metricName"
            value={metricName}
            onChange={handleMetricNameChange}
            required
          />
          {validationError && <p className="error-message">{validationError}</p>} {/* Render the validation error */}
        </div>
        <div className="form-container">
          <label htmlFor="valueType">{t('valueType')} </label>
          <select  value={valueType} onChange={(e) => setValue(e.target.value)}>
            <option value="" disabled>{t('selectType')}</option>
            <option value="INTEGER">{t('integer')}</option>
            <option value="FLOAT">{t('float')}</option>
          </select>
        </div>
        <div className='custom-columns'>
          <label>{t('customColumn')}</label>
          {columns.map((column, index) => (
            <div className="form-container" key={index} >
              <input
                type="text"
                placeholder={t('customColumnPlaceholder')}
                value={column.name}
                onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                required
              />
              <select
                value={column.type}
                onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
              >
                <option value="" disabled>{t('selectColumnType')}</option>
                <option value="INTEGER">{t('integer')}</option>
                <option value="FLOAT">{t('float')}</option>
                <option value="STRING">{t('string')}</option>
              </select>              
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveColumn(index)}
              >
                {t('removeButton')}
              </button>
            </div>
          ))}
          <button type="button" className="basic-button" onClick={handleAddColumn}>{t('addColumnButton')}</button>
        </div>
        <div className="primary-keys-container">
          <label>Primary Keys:</label>
          {columns.map((column, index) => (
            <div key={index}>
              <label>
                <input
                  type="checkbox"
                  name={column.name}
                  onChange={handlePrimaryKeyChange}
                />
                {column.name}
              </label>
            </div>
          ))}
        </div>
        <div className="button-container">
          <button type="submit" className="basic-button create">{t('createButton')}</button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>} {/* Render the response message */}
    </div>
  );
};

export default CreateMetric;