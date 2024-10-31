import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FieldArea from "components/common/FieldArea";
import MemberList from "components/group/MemberList";
import { InputField } from "components/common/FieldStyle";
import Button from "components/common/Button";
import axios from "axios";
import Ava from "assets/images/avatar_woman.png";


interface Member {
  userId: string;
  name: string;
  imgUrl: string;
  role: string;
}


const GroupMember: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get("http://localhost:8080/users");
        const membersData = response.data.map((user: any) => ({
          name: user.nickname,
          imgUrl: user.profileUrl || Ava,
          role: "Member", 
        }));
        setMembers(membersData);
      } catch (error) {
        console.error("유저 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleInvite = (userId: string) => {
    console.log("Inviting user with ID:", userId);
  };

  return (
    <Wrapper>
      <FieldArea
        title="멤버 초대"
        desc="멤버는 최소 1명 ~ 최대 29명 초대 가능합니다."
      ></FieldArea>
      <Invite>
        <InputField 
          placeholder="초대할 멤버의 닉네임을 입력하세요." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        ></InputField>
        <Button width="110px" onClick={() => {}}>
          초대하기
        </Button>
      </Invite>
      <MemberList members={members} searchTerm={searchTerm} onInvite={handleInvite}/>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 100%;
  height: 100%;
`;

const Invite = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  gap: 20px;
`;

export default GroupMember;
