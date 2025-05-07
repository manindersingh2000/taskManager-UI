import axios from "axios";
import { BASE_URL } from "./utils";
export interface SignUpFormInputs {
  fullName: string;
  email: string;
  password: string;
  confirmpassword: string;
}
export interface SignupResponse {
  token?: string;
  message?: string;
}
export const signupUser = async (
  data: SignUpFormInputs
): Promise<SignupResponse> => {
  const response = await axios.post(`${BASE_URL}/signup`, data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.status === 200) {
    return response.data; 
  } else {
    throw new Error(response.data.message || "Signup failed!");
  }
};












