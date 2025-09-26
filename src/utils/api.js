const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const apiClient = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem("token");

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
    throw new Error(data.message || "Something went wrong");
  }

  return data;
};

export const auth = {
  register: (userData) =>
    apiClient("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
    }),

  login: (credentials) =>
    apiClient("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    }),

  forgotPassword: (emailData) =>
    apiClient("/auth/forgot-password", {
      method: "POST",
      body: JSON.stringify(emailData),
    }),

  resetPassword: (resetData) =>
    apiClient("/auth/reset-password", {
      method: "POST",
      body: JSON.stringify(resetData),
    }),

  getProfile: () => apiClient("/auth/me"),

  updateProfile: (userData) =>
    apiClient("/auth/me", {
      method: "PUT",
      body: JSON.stringify(userData),
    }),
};
