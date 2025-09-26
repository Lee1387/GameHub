import { storage } from "./helpers.js";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

class ApiClient {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = storage.get("token") || storage.get("sessionToken");

    const config = {
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      ...options,
    };

    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Request failed");
    }

    return data;
  }

  get(endpoint) {
    return this.request(endpoint);
  }

  post(endpoint, data) {
    return this.request(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }
}

const apiClient = new ApiClient();

export const authAPI = {
  register: (userData) => apiClient.post("/auth/register", userData),
  login: (credentials) => apiClient.post("/auth/login", credentials),
  forgotPassword: (emailData) =>
    apiClient.post("/auth/forgot-password", emailData),
  validateResetToken: (token) =>
    apiClient.get(`/auth/validate-reset-token/${token}`),
  resetPassword: (resetData) =>
    apiClient.post("/auth/reset-password", resetData),
  getProfile: () => apiClient.get("/auth/me"),
};
