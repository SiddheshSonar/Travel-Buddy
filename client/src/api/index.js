import axios from "axios";

const API = axios.create({
  // baseURL: "https://kvh.serveo.net",
  baseURL: "http://localhost:5000",
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("profile")).token
      }`;
  }
  return req;
});


class APIRequests {
  static async signIn(data) {
    return await API.post("/auth/login", data);
  }
  static async verifyOTP(data) {
    return await API.post("/auth/otp", data);
  }
  static async signUp(data) {
    return await API.post("/auth/register", data);
  }
}

export default APIRequests;