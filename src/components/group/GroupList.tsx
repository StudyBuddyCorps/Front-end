import React from "react";
import GroupListItem from "./GroupListItem";
import { styled } from "styled-components";

const GroupList: React.FC = () => {
  // 아이템 리스트 예시
  const items: {
    name: string;
    date: string;
    role: string;
    memberCount: number;
  }[] = [
    {
      name: "불쌍한 4학년 모임",
      date: "2024-04-24",
      role: "Owner",
      memberCount: 10,
    },
    { name: "캡디 손들어", date: "2024-04-25", role: "Member", memberCount: 8 },
    {
      name: "호이짜호이짜",
      date: "2024-04-26",
      role: "Member",
      memberCount: 12,
    },
    { name: "캡디 손들어", date: "2024-04-25", role: "Owner", memberCount: 8 },
    { name: "캡디 손들어", date: "2024-04-25", role: "Member", memberCount: 8 },
    { name: "캡디 손들어", date: "2024-04-25", role: "Owner", memberCount: 8 },
    { name: "캡디 손들어", date: "2024-04-25", role: "Member", memberCount: 8 },
  ];

  return (
    <ListContainer>
      <Column>
        <div id="c1" className="c">
          Name
        </div>
        <div id="c2" className="c">
          Role
        </div>
        <div id="c3" className="c">
          Date
        </div>
        <div id="c4" className="c">
          Member
        </div>
        <div id="c5" className="c"></div>
      </Column>
      {items.map((item, index) => (
        <GroupListItem
          key={index}
          name={item.name}
          date={item.date}
          role={item.role}
          memberCount={item.memberCount}
        />
      ))}
    </ListContainer>
  );
};
const ListContainer = styled.div`
  margin: 0px 40px;
`;

const Column = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: InterSemiBold;
  font-size: 20px;
  color: #a5a5a5;
  border-bottom: 2px solid #cdcdcd;
  padding-left: 30px;

  .c {
    flex: 1;
    padding: 20px 0px;
    display: flex;
    justify-content: center;
  }

  #c1 {
    flex: 3;
    justify-content: flex-start;
  }
`;

export default GroupList;
