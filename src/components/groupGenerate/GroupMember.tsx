import React from "react";
import styled from "styled-components";
import FieldArea from "components/common/FieldArea";
import MemberList from "components/group/MemberList";
import { InputField } from "components/common/FieldStyle";
import Button from "components/common/Button";

const GroupMember: React.FC = () => {
  return (
    <Wrapper>
      <FieldArea
        title="멤버 초대"
        desc="멤버는 최소 1명 ~ 최대 29명 초대 가능합니다."
      ></FieldArea>
      <Invite>
        <InputField placeholder="초대할 멤버의 이메일 주소를 입력하세요."></InputField>
        <Button width="110px" onClick={() => {}}>
          초대하기
        </Button>
      </Invite>
      <MemberList />
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
