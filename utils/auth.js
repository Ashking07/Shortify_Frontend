// utils/auth.js
export const logoutUser = () => {
  localStorage.removeItem("token"); // or set to invalid string
  // localStorage.removeItem("name");

  window.location.href = "/"; // optional: redirect to Home
};
