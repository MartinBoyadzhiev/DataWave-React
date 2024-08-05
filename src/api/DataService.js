import axios from "axios";

;
const COLUMN_NAME_URL = "http://localhost:8080/metric/metric_price/columns";

export async function fetchTimeSeriesData(metricName) {
    const API_URL = `http://localhost:8080/metric/${metricName}/data`;
    const token = localStorage.getItem('jwtToken');
    return await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchColumnNames(metricName) {
    const API_URL = `http://localhost:8080/metric/${metricName}/columns`;
    const token = localStorage.getItem('jwtToken');
    return await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
