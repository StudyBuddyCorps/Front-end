import CircleImg from "components/common/CircleImg";
import React from "react";
import styled from "styled-components";
import Badge from "./Badge";
import { Link } from "react-router-dom";

interface MemberProfileProps {
  name: string;
  imgUrl: string;
  role: string;
}

const MemberProfile: React.FC<MemberProfileProps> = (
  props: MemberProfileProps
) => {
  return (
    <Link
      to={"/group/불쌍한 4학년/${props.name}"}
      style={{ textDecoration: "none" }}
    >
      <Wrapper>
        <LeftSection>
          <CircleImg size="50px" src={props.imgUrl} />
          {props.name}
        </LeftSection>
        <Badge>{props.role}</Badge>
      </Wrapper>
    </Link>
  );
};

const Wrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-sizing: border-box;
  align-items: center;
  padding: 15px 50px;
  color: black;
`;

const LeftSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  font-size: 20px;
  font-family: NotoSansBold;
`;

export default MemberProfile;
