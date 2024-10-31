import styled from "styled-components";
import EditProfile from "./EditProfile";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveToken, getToken, removeToken } from "../../utils/localStroage";
import {jwtDecode} from "jwt-decode";

interface UserData {
  name: string;
  profileUrl: string;
  goal: number;
  defaultSettings: {
    roomType: string;
    studyMate: {
      image: string;
      voice: string;
    };
    assistantTone: string;
    cameraAccess: boolean;
  };
}

const Account = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [name, setName] = useState("");
  const [isDuplicate, setIsDuplicate] = useState<boolean | null>(null);

  const token = getToken();
  const id = token ? (jwtDecode<{ id: string }>(token).id) : null;

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        setName(response.data.name);
      } catch (error) {
        console.error("사용자 데이터 가져오기 실패:", error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      console.log("userData: ", userData);
    }
  }, [userData]);


  const handleCheckDuplicate = async () => {
    try {
      console.log("변경된 이름: ", name);
      const response = await axios.post("http://localhost:8080/users/nickname/check", { name, id });
      setIsDuplicate(response.data.isDuplicate);
      console.log("중복: ", isDuplicate);
    } catch (error) {
      console.error("닉네임 중복 확인 실패:", error);
    }
  };

  const handleNicknameChange = async () => {
    if (!id) return;

    try {
      await axios.put("http://localhost:8080/users/nickname", { id, name });
      alert("닉네임이 성공적으로 변경되었습니다.");
      setUserData((prevData) => prevData ? { ...prevData, name } : null);
    } catch (error) {
      console.error("닉네임 변경 실패:", error);
      alert("닉네임 변경에 실패했습니다.");
    }
  };

  return (
    <Wrapper>
      <Profile>
        <EditProfile/>
        <Title>
          안녕하세요, {userData?.name || "홍길동"} 님
        </Title>          
      </Profile>
      <Edit>
        <Container>
          <Label>닉네임</Label>
          <Desciption>한글, 영문, 숫자 조합 2 ~ 18자</Desciption>
          <InputDiv>
            <Input 
              value={name} onChange={(e) => setName(e.target.value)} placeholder="닉네임 입력"
            />
            <SaveBtn onClick={handleCheckDuplicate}>중복 확인</SaveBtn>
          </InputDiv>
          {isDuplicate !== null && (
            <DuplicateMessage  isDuplicate={isDuplicate}>
              {isDuplicate ? "이미 사용 중인 닉네임입니다." : "사용 가능한 닉네임입니다."}
            </DuplicateMessage>
          )}
        </Container>
        <Container>
          <Label>이메일</Label>
          <EmailDiv>test@gmail.com</EmailDiv>
        </Container>
      </Edit>
      <BtnDiv>
        <SaveBtn onClick={handleNicknameChange}>저장</SaveBtn>
      </BtnDiv>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 2px solid ${({ theme }) => (theme.colors.white01)};
  border-radius: 5px;
  margin: 43px;
  padding: 65px 45px;
  box-sizing: content-box;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 50px;
`

const Title = styled.div`
  font-size: 40px;
  font-family: NotoSansSemiBold;
`;

const Edit = styled.div`
  margin: 65px 0;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-family: NotoSansSemiBold;
  font-size: 20px;
`;

const Desciption = styled.div`
  font-family: NotoSansSemiBold;
  font-size: 15px;
  color: ${({ theme }) => (theme.colors.subMain )};
`;

const InputDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 40px;
`;

const Input = styled.input`
  width: 600px;
  height: 46px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => (theme.colors.white01 )};
  font-size: 20px;
  padding-left: 15px;
  box-sizing: border-box;
`;

const EmailDiv = styled.div`
  width: 600px;
  height: 46px;
  border-radius: 5px;
  border: none;
  background-color: ${({ theme }) => (theme.colors.white01 )};
  font-size: 20px;
  padding-left: 15px;
  box-sizing: border-box;
  color: #CDCDCD;
  display: flex;
  align-items: center;
`;

const SaveBtn = styled.button`
  width: 150px;
  height: 54px;
  color: #FFFFFF;
  background-color: ${({ theme }) => (theme.colors.subMain )};
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;

const BtnDiv = styled.div`
  display: flex;
  width: 100%;
  justify-content: flex-end;
`;

const DuplicateMessage = styled.p<{ isDuplicate: boolean }>`
  font-size: 14px;
  color: ${({ isDuplicate }) => (isDuplicate ? "red" : "green")};
`;

export default Account;