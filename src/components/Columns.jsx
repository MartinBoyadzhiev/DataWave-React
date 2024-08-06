import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const ColumnNames = ({ columnNames }) => {
  const [selectedColumns, setSelectedColumns] = useState([]);
  const { t } = useTranslation();

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
	  <h3>{t('filters')}</h3>
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