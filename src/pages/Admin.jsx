import React from 'react';
import CreateMetric from '../components/CreateMetric';
import { useTranslation } from 'react-i18next';


const Admin = () => {
  const { t } = useTranslation();
  return (
	<div className="admin-container">
      <div className="admin-box">
        <h1 className="admin-title">{t('createMetricHeader')}</h1>
        <CreateMetric />
      </div>
    </div>
  );
};

export default Admin;