export const saveToken = (token: string): void => {
  try {
    localStorage.setItem("accessToken", token);
  } catch (error) {
    console.error("Unable to save access token:", error);
  }
};

export const getToken = (): string | null => {
  try {
    return localStorage.getItem("accessToken");
  } catch (error) {
    console.error("Unable to get access token:", error);
    return null;
  }
};

export const removeToken = (): void => {
  try {
    localStorage.removeItem("accessToken");
  } catch (error) {
    console.error("Unable to remove access token:", error);
  }
};
