import React, { useState } from 'react';
import axios from 'axios';
import './CreateMetric.css';

const CreateMetric = () => {
  const [metricName, setName] = useState('');
  const [valueType, setValue] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '' }]);
  const [primaryKeys, setPrimaryKeys] = useState([]);
  const [responseMessage, setResponseMessage] = useState(''); // State variable for response message
  const [validationError, setValidationError] = useState('');

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
      setValidationError('Metric name must be alphanumeric.');
      return false;
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

    if (!validateMetricName(metricName)) {
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
      setResponseMessage(response.data.message);
    } catch (error) {
      if (error.response) {
        setResponseMessage(error.response.data.message); // Set the error response message
      } else {
        setResponseMessage('An error occurred while creating the metric.');
      }
    }
  };

  return (
    <div className="create-metric-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="metricName">Metric name: </label>
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
          <label htmlFor="valueType">Value type: </label>
          <select  value={valueType} onChange={(e) => setValue(e.target.value)}>
            <option value="">Select Value Type</option>
            <option value="INTEGER">Integer</option>
            <option value="FLOAT">Float</option>
            <option value="STRING">String</option>
          </select>
        </div>
        <div className='custom-columns'>
          <label>Custom Columns:</label>
          {columns.map((column, index) => (
            <div className="form-container" key={index} >
              <input
                type="text"
                placeholder="Column Name"
                value={column.name}
                onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                required
              />
              <select
                value={column.type}
                onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
              >
                <option value="">Select Column Type</option>
                <option value="INTEGER">Integer</option>
                <option value="FLOAT">Float</option>
                <option value="STRING">String</option>
              </select>              
              <button
                type="button"
                className="remove-button"
                onClick={() => handleRemoveColumn(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className="basic-button" onClick={handleAddColumn}>Add Column</button>
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
          <button type="submit" className="basic-button create">Create Metric</button>
        </div>
      </form>
      {responseMessage && <p>{responseMessage}</p>} {/* Render the response message */}
    </div>
  );
};

export default CreateMetric;