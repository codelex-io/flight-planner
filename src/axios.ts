import axios, { AxiosBasicCredentials } from "axios";

const credentials: AxiosBasicCredentials = {
  username: "codelex-admin",
  password: "Password123"
};

export const adminClient = axios.create({
  baseURL: "http://localhost:8080/admin-api/",
  auth: credentials
});

export const testingClient = axios.create({
  baseURL: "http://localhost:8080/testing-api/"
});

export const customerClient = axios.create({
  baseURL: "http://localhost:8080/api/"
});
