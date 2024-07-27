import axios from "axios";

const API_URL = "http://localhost:8080/metric/metric_price/data?asset=BTC";
const COLUMN_NAME_URL = "http://localhost:8080/metric/metric_price/columns";

export async function fetchTimeSeriesData() {
    return await axios.get(API_URL)
}

export async function fetchColumnNames() {
    return await axios.get(COLUMN_NAME_URL)
}
