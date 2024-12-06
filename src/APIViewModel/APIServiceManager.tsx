import axios from "axios";

export const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "",
};

// API Service Manager Methods
export const APIServiceManager = {
  get: (apiUrl: any, headers: any) => {
    const config = { headers };
    return axios.get(apiUrl, config);
  },
  post: (apiUrl: any, data: any, headers = {}) => {
    const config = { headers };
    return axios.post(apiUrl, data, config);
  },
  put: (apiUrl: any, data: any, headers = {}) => {
    const config = { headers };
    return axios.put(apiUrl, data, config);
  },
  delete: (apiUrl: any, headers = {}) => {
    const config = { headers };
    return axios.delete(apiUrl, config);
  },
};

// Api Response Code
export enum ApiResponseCode {
  success = 200,
  BadRequest = 400,
  Unauthorized = 401,
  NotFound = 404,
  Validation = 403,
}

export enum RequestType {
  get = "get",
  post = "post",
  put = "put",
  delete = "delete",
}
