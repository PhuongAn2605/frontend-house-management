import axios from "axios";

const Http = axios.create({
  // baseURL: "https://backend-house-management.herokuapp.com/api/",
  baseURL: "http://localhost:5000/api/",
  timeout: 60000,
});

export const addHttpHeaders = (headers) => {
  Http.defaults.headers = { ...Http.defaults.headers, ...headers };
};

Http.defaults.params = {};

export default Http;
