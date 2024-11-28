import React from "react";
import styled from "styled-components";
import { timeToString } from "utils/timeLine";

interface TimeProps {
  dayTime: number;
  weekTime: number;
  monthTime: number;
}

const MyHistoryTime: React.FC<TimeProps> = (props: TimeProps) => {
  const day = timeToString(props.dayTime);
  const week = timeToString(props.weekTime);
  const month = timeToString(props.monthTime);

  return (
    <Container>
      <TitleS>누적 공부 시간</TitleS>
      <ContentS>
        <TimeCard>
          <Title>
            이번 달<br />
            공부시간(h)
          </Title>
          <TimeHis>{month}</TimeHis>
        </TimeCard>
        <TimeCard>
          <Title>
            이번 주<br />
            공부시간(h)
          </Title>
          <TimeHis>{week}</TimeHis>
        </TimeCard>
        <TimeCard>
          <Title>
            오늘
            <br />
            공부시간(h)
          </Title>
          <TimeHis>{day}</TimeHis>
        </TimeCard>
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
  padding: 20px;
`;

const TitleS = styled.div`
  font-family: NotoSansBold;
  color: ${({ theme }) => theme.colors.black01};
  font-size: 30px;
`;

const ContentS = styled.div`
  display: flex;
  flex-direction: column;
`;

const TimeCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

const Title = styled.div`
  font-family: NotoSansMedium;
  text-align: center;
  font-size: 20px;
`;

const TimeHis = styled.div`
  font-family: NotoSansLight;
  font-size: 50px;
  color: ${({ theme }) => theme.colors.highlight};
`;

export default MyHistoryTime;
