import React from 'react';
import MetricsOverview from '../components/MetricOverview';
import './Home.css';

function Home({ isLoggedIn, isAdmin }) {
    return (
        <div className="home-container">
            <h2 className="home-title">Metric Overview</h2>
            <div className="home-metrics-overview">
                {isLoggedIn ? <MetricsOverview isAdmin={isAdmin} /> : <p>Please log in to view metrics.</p>}
            </div>
        </div>
    );
}

export default Home;