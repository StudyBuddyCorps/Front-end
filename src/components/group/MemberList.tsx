import React from "react";
import { styled } from "styled-components";
import MemberProfile from "./MemberProfile";

interface Member {
  name: string;
  imgUrl: string;
  role: string;
}

interface MemberListProps {
  members: Member[];
  searchTerm: string;
}

const MemberList: React.FC<MemberListProps> = ({ members, searchTerm }) => {
  const filteredItems = members.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ListContainer>
      {filteredItems.map((item, index) => (
        <MemberProfile
          key={index}
          name={item.name}
          imgUrl={item.imgUrl}
          role={item.role}
        />
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
export default MemberList;
