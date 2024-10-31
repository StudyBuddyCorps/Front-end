import React from "react";
import { styled } from "styled-components";
import MemberProfile from "./MemberProfile";
import Button from "components/common/Button";

interface Member {
  name: string;
  imgUrl: string;
  role: string;
  userId: string;
}

interface MemberListProps {
  members: Member[];
  searchTerm: string;
  onInvite: (userId: string) => void;
}

const MemberList: React.FC<MemberListProps> = ({ members, searchTerm, onInvite }) => {
  const filteredItems = members.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ListContainer>
      {filteredItems.map((item, index) => (
        <MemberItem key={item.userId}>
          <MemberProfile name={item.name} imgUrl={item.imgUrl} role={item.role} />
          <Button width="80px" onClick={() => onInvite(item.userId)}>
            초대
          </Button>
        </MemberItem>
      ))}
    </ListContainer>
  );
};

const ListContainer = styled.div`
  width: 90%;
  height: 50vh;
  overflow: auto;
  padding: 0px 20px 0px 10px;
`;

const MemberItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

export default MemberList;
