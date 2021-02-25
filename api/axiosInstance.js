const axios = require("axios");

const axiosInstance = axios.create({
  baseURL: "https://api.spacexdata.com/v3",
});

exports.axiosInstance = axiosInstance;
