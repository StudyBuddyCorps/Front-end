// src/services/authService.ts
import { getToken, removeToken, saveToken } from "utils/localStroage";
import { getInitialAccessToken } from "utils/cookie";
import { googleLogin, kakaoLogin, localLogin, logout } from "api/auth";
import { LoginData } from "DTO/auth/Login.dto";

export const checkAccessToken = (): boolean => {
  let accessToken = getToken();

  if (!accessToken) {
    // 기존에 localStorage에 존재하지 않으면
    const accessToken = getInitialAccessToken();

    if (accessToken) {
      saveToken(accessToken);
      return true;
    } else {
      console.log("No access token found in localStorage or cookies.");
      return false;
    }
  }
  return true; // 존재하는 경우
};

export const handleLogin = async (email: string, password: string) => {
  try {
    const data: LoginData = {
      email: email,
      password: password,
    };
    const response = await localLogin(data);
    if (response.status == 200) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: response.data.message,
      };
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};

export const handleGoogleLogin = async () => {
  try {
    const response = await googleLogin();
    if (response.status === 200) {
      const { url } = response.data;
      window.location.href = url; // 구글 로그인 화면으로 이동
    } else {
      console.error("Google login failed");
    }
  } catch (error) {
    console.error("Error during Google login:", error);
  }
};

export const handleKakaoLogin = async () => {
  try {
    const response = await kakaoLogin();
    if (response.status === 200) {
      const { url } = response.data;
      window.location.href = url; // 카카오 로그인 화면으로 이동
    } else {
      console.error("Kakao login failed");
    }
  } catch (error) {
    console.error("Error during Kakao login:", error);
  }
};

export const handleLogout = async () => {
  try {
    const response = await logout();
    if (response.status == 200) {
      removeToken(); // AccessToken 삭제
      return true;
    }
  } catch (error) {
    console.error("Logout error:", error);
    return false;
  }
};
