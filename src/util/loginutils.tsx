import axios from "axios";
import { BASE_URL } from "./utils";
export interface LoginFormInputs {
  email: string;
  password: string;
}
export interface LoginResponse {
  token: string;
  message?: string;
}
export const loginUser = async (data: LoginFormInputs): Promise<LoginResponse> => {
  const response = await axios.post(`${BASE_URL}/login`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200 && response.data.token) {
    return response.data;
  } else {
    throw new Error(response.data.message || "Login failed!");
  }
};









