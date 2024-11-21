import axios from "./index"; // instance가 담겨있음
import { SignupData } from "DTO/user/Signup.dto";

export const signup = (data: SignupData) => {
  return axios.post("/users/signup", data);
};

export const getUser = () => {
  return axios.get("/users/user");
};
