import React, { useState, useEffect } from "react";
import SearchField from "components/common/SearchField";
import MemberProfile from "./MemberProfile";
import styled from "styled-components";
import axios from "axios";
import { getToken } from "utils/localStroage";
import Ava from "assets/images/avatar_woman.png";

export interface Member {
  userId: string;
  nickname: string;
  email: string;
  imgUrl: string;
  role: string;
}

interface MemberFieldProps {
  groupId: string;
  initialMembers: Member[];
}

const MemberField: React.FC<MemberFieldProps> = ({
  groupId,
  initialMembers,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const token = getToken();

  useEffect(() => {
    const fetchFilteredMembers = async () => {
      if (!searchTerm) {
        setMembers(initialMembers);
        return;
      }
      try {
        const response = await axios.get(
          `http://localhost:8080/groups/${groupId}/members/search`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { searchTerm },
          }
        );
        setMembers(response.data);
      } catch (error) {
        console.error("멤버 검색 중 오류 발생:", error);
      }
    };

    if (groupId) {
      fetchFilteredMembers();
    }
  }, [groupId, searchTerm, initialMembers]);

  return (
    <Container>
      <TitleS>
        <LeftS>멤버</LeftS>
        <RightS>
          <SearchField
            placeHolder="Search Member Name"
            onSearch={(value) => setSearchTerm(value)}
          />
        </RightS>
      </TitleS>
      <ContentS>
        <ListContainer>
          {members.map((member, index) => (
            <MemberProfile
              key={index}
              name={member.nickname}
              imgUrl={member.imgUrl === "" ? Ava : member.imgUrl}
              role={member.role}
            />
          ))}
        </ListContainer>
      </ContentS>
    </Container>
  );
};

const Container = styled.div`
  background-color: #fdfdfd;
  border-style: solid;
  border-width: 2px;
  border-color: ${({ theme }) => theme.colors.white01};
  border-radius: 20px;
  box-shadow: 4px 4px 20px #0000000d;
  box-shadow: -4px -4px 20px #0000000d;
`;

const TitleS = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: NotoSansBold;
  color: ${({ theme }) => theme.colors.black01};
  font-size: 24px;
  padding: 20px 40px;
`;

const ContentS = styled.div`
  display: flex;
  flex-direction: column;
`;
const LeftS = styled.div``;
const RightS = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const ListContainer = styled.div`
  width: 100%;
  height: 50vh;
  overflow: auto;
  box-sizing: border-box;
  :hover {
    background-color: #586fc566;
    border-radius: 20px;
  }
`;

export default MemberField;
