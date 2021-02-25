const { default: axios } = require("axios");
const { axiosInstance } = require("./axiosInstance");

const api = {
  getLauches: async () => {
    let response = await axiosInstance.get("/launches").then((res) => res.data);
    return response;
  },
  getLaunch: async (flight_number) => {
    let response = await axiosInstance
      .get(`/launches/${flight_number}`)
      .then((res) => res.data);
    return response;
  },
  getRockets: async () => {
    let response = await axiosInstance.get("/rockets").then((res) => res.data);
    return response;
  },
  getRocket: async (rocket_id) => {
    let response = await axiosInstance
      .get(`/rockets/${rocket_id}`)
      .then((res) => res.data);
    return response
  },
};

exports.api = api;
