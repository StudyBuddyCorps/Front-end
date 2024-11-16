import React, { useEffect, useState } from "react";
import GroupListItem from "./GroupListItem";
import { styled } from "styled-components";

interface Group {
  groupId: string;
  name: string;
  createdAt: string;
  role: string;
  memberCount: number;
}

interface GroupListProps {
  groups: Group[];
}

const GroupList: React.FC<GroupListProps> = ({ groups }) => {
  return (
    <ListContainer>
      <Column>
        <div id="c1" className="c">Name</div>
        <div id="c2" className="c">Role</div>
        <div id="c3" className="c">Date</div>
        <div id="c4" className="c">Member</div>
        <div id="c5" className="c"></div>
      </Column>
      {groups.map((group) => (
        <GroupListItem
          key={group.groupId}
          name={group.name}
          date={new Date(group.createdAt).toLocaleDateString()}
          role={group.role || "Member"}
          memberCount={group.memberCount}
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
