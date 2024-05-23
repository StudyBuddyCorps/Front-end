import React from "react";
import { styled } from "styled-components";
import MemberProfile from "./MemberProfile";
import Ava from "../../assets/avatar_woman.png";

const MemberList: React.FC = () => {
  const items: {
    // 임시 데이터
    name: string;
    imgUrl: string;
    role: string;
  }[] = [
    {
      name: "배주헝",
      imgUrl: Ava,
      role: "Owner",
    },
    { name: "전희죵", imgUrl: Ava, role: "Member" },
    {
      name: "한디슈",
      imgUrl: Ava,
      role: "Member",
    },
  ];

  return (
    <ListContainer>
      {items.map((item, index) => (
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
  margin: 0px 40px;
  widht: auto;
  height: auto;
`;
export default MemberList;
