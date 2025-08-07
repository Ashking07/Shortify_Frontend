import { useContext } from "react";
import { UserContext } from "../context/user-context.jsx"; // Update import path

export const useUser = () => useContext(UserContext);
