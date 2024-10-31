import React, { useState } from "react";
import SearchField from "components/common/SearchField";
import MemberProfile from "./MemberProfile";
import styled from "styled-components";

interface Member {
  name: string;
  imgUrl: string;
  role: string;
}

interface MemberFieldProps {
  members: Member[];
}

const MemberField: React.FC<MemberFieldProps> = ({ members }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredItems = members.filter((member) =>
    member.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <TitleS>
        <LeftS>멤버</LeftS>
        <RightS>
          <SearchField placeHolder="Search Member Name" onSearch={(value) => setSearchTerm(value)}></SearchField>
        </RightS>
      </TitleS>
      <ContentS>
        <ListContainer>
          {filteredItems.map((member, index) => (
            <MemberProfile
              key={index}
              name={member.name}
              imgUrl={member.imgUrl}
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
