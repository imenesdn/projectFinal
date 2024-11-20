import axios from "axios";

const debug = true;
export const baseUrl = import.meta.env.VITE_API_URL;
const getAuthToken = () => localStorage.getItem("token") || null;

console.log("API-URL", baseUrl, process.env.NODE_ENV);
const api = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-type": "application/json",
  },
});

const successRequestHandler = (config) => {
  // console.log('successRequestHandler', config)
  if (getAuthToken()) config.headers.Authorization = `Bearer ${getAuthToken()}`;
  return config;
};

const errorRequestHandler = (error) => {
  if (debug) console.info("✉ REQ_ERR ", error);
  return Promise.reject({ ...error });
};

const successResponseHandler = (response) => {
  // console.log('successResponseHandler', response)
  return response.data;
};
const errorResponseHandler = (error) => {
  if (debug) {
    console.info(
      "✉ RES_ERR ",
      error.message + " | ",
      error.response && error.response.data
        ? error.response.data.message
        : null,
    );
  }
  if (error.response.data.status == 401) {
    localStorage.removeItem("token");
    window.location.replace("/login");
  }
  return Promise.reject(
    error.response ?? {
      data: { errors: [], message: "Bad Request", status: 400, success: false },
    },
  );
};
api.interceptors.request.use(successRequestHandler, errorRequestHandler);
api.interceptors.response.use(successResponseHandler, errorResponseHandler);

export default {
  install: (app) => {
    app.provide("$api", api);
    app.provide("$axios", axios);
  },
};

export { axios, api };
