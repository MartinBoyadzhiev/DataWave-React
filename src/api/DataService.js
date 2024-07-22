import axios from "axios";

const API_URL = "http://localhost:8080/metric/metric_price/data/timestamp?asset=BTC";

export async function fetchTimeSeriesData() {
    return await axios.get(API_URL)
}