import axios from "axios";

const API = axios.create({
  baseURL: "https://cab-booking-system-tj48.onrender.com/api"
});

export default API;
