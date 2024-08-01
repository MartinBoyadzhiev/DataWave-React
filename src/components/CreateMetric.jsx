import React, { useState } from 'react';
import axios from 'axios';

const CreateMetric = () => {
  const [metricName, setName] = useState('');
  const [valueType, setValue] = useState('');
  const [columns, setColumns] = useState([{ name: '', type: '' }]);
  const [primaryKeys, setPrimaryKeys] = useState([]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      console.log('Metric created:', response.data);
    } catch (error) {
      console.error('Error creating metric:', error);
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
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="valueType">Value type: </label>
          <input
            type="text"
            id="valueType"
            value={valueType}
            onChange={(e) => setValue(e.target.value)}
            required
          />
        </div>
        <div className='custom-columns'>
          <label>Custom Columns:</label>
          {columns.map((column, index) => (
            <div key={index} style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Column Name"
                value={column.name}
                onChange={(e) => handleColumnChange(index, 'name', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Column Type"
                value={column.type}
                onChange={(e) => handleColumnChange(index, 'type', e.target.value)}
                required
              />
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
        <div>
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
        <button type="submit" className="basic-button create">Create Metric</button>
      </form>
    </div>
  );
};

export default CreateMetric;