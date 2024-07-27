import React, { useState } from 'react';

const ColumnNames = ({ columnNames }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);

  const handleCheckboxChange = (event) => {
	const { name, checked } = event.target;
	if (checked) {
	  setSelectedColumns([...selectedColumns, name]);
	} else {
	  setSelectedColumns(selectedColumns.filter(column => column !== name));
	}
  };

  return (
	<div className="column-names">
	  <h3>Filters:</h3>
	  <ul>
		{columnNames.map((name, index) => (
		  <li key={index}>
			<label>
			  <input
				type="checkbox"
				name={name}
				onChange={handleCheckboxChange}
			  />
			  {name}
			</label>
		  </li>
		))}
	  </ul>
	</div>
  );
};

export default ColumnNames;