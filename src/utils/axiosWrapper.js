import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();

const API_KEY = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: API_KEY,
  timeout: 10000,
});

axiosInstance.interceptors.request.use((config) => {
  const token = cookies.get("jwtToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const post = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

const handleError = (error) => {
  if (axios.isAxiosError(error)) {
    const statusCode = error.response?.status;
    if (statusCode == 401) {
      // window.location.href = "/auth";
    } else {
      console.error("Error Response:", error.response?.data);
      console.error("Error Status:", statusCode);
    }
  } else if (error instanceof Error) {
    console.error("Error Message:", error.message);
  } else {
    console.error("Unknown error type", error);
  }
};
