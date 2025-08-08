// utils/auth.js
export const logoutUser = () => {
  // localStorage.removeItem("token"); // or set to invalid string
  // localStorage.removeItem("email");
  // localStorage.removeItem("userID");
  // localStorage.removeItem("name");
  localStorage.clear(); // wipes everything in localStorage

  window.location.href = "/"; // optional: redirect to Home
};
