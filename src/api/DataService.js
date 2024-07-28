import axios from "axios";

const API_URL = "http://localhost:8080/metric/metric_price/data?asset=BTC";
const COLUMN_NAME_URL = "http://localhost:8080/metric/metric_price/columns";

export async function fetchTimeSeriesData() {
    const token = localStorage.getItem('jwtToken');
    return await axios.get(API_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function fetchColumnNames() {
    const token = localStorage.getItem('jwtToken');
    return await axios.get(COLUMN_NAME_URL, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}
