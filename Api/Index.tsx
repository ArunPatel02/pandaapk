import axios from "axios";
import { getToken } from "../helpers/TokenStorage/Index";

const AxiosInstance = axios.create({
  // baseURL: "http://192.168.1.5:3000/api",
  baseURL: "https://pandaserver-production.up.railway.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

AxiosInstance.interceptors.request.use(async function (config) {
  // Do something before request is sent
  let token = await getToken();
  // console.log("this is token", token);
  config.headers["Authorization"] = token;
  return config;
});

AxiosInstance.interceptors.response.use(function (response) {
  // console.log("response" + response);
  return response;
});

export default AxiosInstance;
