import axios from "axios";

const BASE_URL = 'https://asia-southeast2-sejutacita-app.cloudfunctions.net';

const instance = axios.create({
  baseURL: BASE_URL
});

export default instance;