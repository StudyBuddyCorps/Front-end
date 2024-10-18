import Cookies from "js-cookie";

export const getInitialAccessToken = (): string | undefined => {
  // 'accessToken' 쿠키 값을 가져와 반환
  return Cookies.get("accessToken");
};
