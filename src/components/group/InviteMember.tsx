import React, { useState, useEffect } from "react";
import styled from "styled-components";
import MemberList from "components/group/MemberList";
import { InputField } from "components/common/FieldStyle";
import Button from "components/common/Button";
import axios from "axios";
import Ava from "assets/images/avatar_woman.png";

interface Member {
  name: string;
  imgUrl: string;
  role: string;
  userId: string;
}

interface InviteMemberProps {
  groupId: string;
  onClose: () => void;
  onMemberInvite: (memberId: string) => void;
}

const InviteMember: React.FC<InviteMemberProps> = ({ groupId, onClose, onMemberInvite }) => {
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
          userId: user._id,
        }));
        setMembers(membersData);
      } catch (error) {
        console.error("유저 데이터를 불러오는 중 오류 발생:", error);
      }
    };

    fetchMembers();
  }, []);

  const handleInvite = async (userId: string) => {
    try {
      await axios.post(`http://localhost:8080/groups/addMember`, {
        groupId,
        userId,
        role: "member",
      });
      alert("멤버가 성공적으로 초대되었습니다!");
      onMemberInvite(userId);
    } catch (error) {
      console.error("멤버 초대 중 오류 발생:", error);
      alert("멤버 초대에 실패했습니다.");
    }
  };

  return (
    <ModalOverlay>
      <ModalContainer>
        <Header>
          <h2>멤버 초대</h2>
          <Button width="40px" onClick={onClose}>
            X
          </Button>
        </Header>
        <InputField
          placeholder="초대할 멤버의 닉네임을 입력하세요."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <MemberList members={members} searchTerm={searchTerm} onInvite={handleInvite} />
      </ModalContainer>
    </ModalOverlay>
  );
};

export default InviteMember;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background-color: white;
  width: 500px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.2);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;