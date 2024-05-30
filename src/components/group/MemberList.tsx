import React from "react";
import { styled } from "styled-components";
import MemberProfile from "./MemberProfile";
import Ava from "assets/images/avatar_woman.png";

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
  width: 90%;
  height: 50vh;
  overflow: auto;
  padding: 0px 20px 0px 10px;
`;
export default MemberList;
