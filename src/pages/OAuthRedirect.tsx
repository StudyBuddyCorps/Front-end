import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuthRedirect = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    // async 함수를 useEffect 내부에서 따로 선언
    const fetchToken = async () => {
      if (code) {
        try {
          const response = await axios.get(
            `http://localhost:8080/auth/kakao/oauth?code=${code}`
          );
          if (response.data) {
            // accessToken 발급 받고 localStorage에 저장
            console.log(response.status);
            navigate("/home");
          }
        } catch (error) {
          console.error("Error sending code to backend:", error);
        }
      }
    };

    fetchToken(); // 비동기 함수 호출
  }, [code]);

  return <div>KAKAO Login 중...</div>;
};

export default OAuthRedirect;
