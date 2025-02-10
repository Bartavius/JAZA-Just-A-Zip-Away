import api from "../api"; // Import pre-configured axios instance
import { setTokens } from "./authSlice"; // Import Redux action

export async function loginUser(username: string, password: string, dispatch: any) {
  
  try {
    
    const response = await api.post("/api/accounts/login/", {
      username,
      password,
    });

    console.log("Login response:", response.data);

    if (response.data.access_token && response.data.refresh_token) {
      dispatch(setTokens(response.data)); // Store tokens in Redux
    }

    return response.data;
    
  } catch (error) {
    console.error("Login error:", error);
    return null;
  }
};


