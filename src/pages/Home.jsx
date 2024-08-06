import React from 'react';
import MetricsOverview from '../components/MetricOverview';
import './Home.css';
import { useTranslation } from 'react-i18next';

function Home({ isLoggedIn, isAdmin }) {
    const { t} = useTranslation();
    return (
        <div className="home-container">
            <h2 className="home-title">{t('overview')}</h2>
            <div className="home-metrics-overview">
                {isLoggedIn ? <MetricsOverview isAdmin={isAdmin} /> : <p>{t('overviewMsg')}</p>}
            </div>
        </div>
    );
}

export default Home;