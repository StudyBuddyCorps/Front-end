import { LoginData } from "DTO/auth/Login.dto";
import axios from "./index"; // instance가 담겨있음

export const localLogin = (data: LoginData) => {
  return axios.post("/auth/login", data);
};

export const kakaoLogin = () => {
  return axios.get("/auth/oauth/kakao");
};

export const googleLogin = () => {
  return axios.get("/auth/oauth/google");
};

export const logout = () => {
  return axios.get("/auth/logout");
};
