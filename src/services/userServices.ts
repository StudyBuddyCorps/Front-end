import { SignupData } from "DTO/user/Signup.dto";
import { signup } from "api/user";

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
