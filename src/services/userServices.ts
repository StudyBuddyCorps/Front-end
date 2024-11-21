import { SignupData } from "DTO/user/Signup.dto";
import { signup, getUser } from "api/user";
import { getNewToken } from "api/auth";
import { saveToken } from "utils/localStroage";

export const handleSignup = async (
  email: string,
  password: string,
  comparePassword: string,
  nickname: string
) => {
  try {
    const data: SignupData = {
      email: email,
      password: password,
      comparePassword: comparePassword,
      nickname: nickname,
    };

    const response = await signup(data);
    if (response.status == 200) {
      return {
        ok: true,
      };
    } else {
      return {
        ok: false,
        error: response.data.message as string,
      };
    }
  } catch (error) {
    return { ok: false, error: error as string };
  }
};

export const handleUser = async () => {
  try {
    const response = await getUser();

    if (response.status === 200) {
      return {
        ok: true,
        message: "user",
        user: response.data,
      };
    } else if (response.status === 401) {
      console.log("Token expired, attempting to refresh...");
      const newTokenResponse = await getNewToken();
      if (newTokenResponse.status === 200) {
        const newAccessToken = newTokenResponse.data.access_token;
        saveToken(newAccessToken);
        return {
          ok: true,
          message: "newToken",
        };
      } else {
        return {
          ok: false,
          error: "Failed to update access_token",
        };
      }
    } else {
      return {
        ok: false,
        error: `Unexpected error: ${response.status}`,
      };
    }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error ? error.message : "An unknown error occurred",
    };
  }
};
