import React from "react";
import styled from "styled-components";

interface TimeProps {
  dayTime: string;
  weekTime: string;
  monthTime: string;
}

const MyHistoryTime: React.FC<TimeProps> = (props: TimeProps) => {
  return (
    <Container>
      <TitleS>누적 공부 시간</TitleS>
      <ContentS>
        <TimeCard>
          <Title>
            이번 달 <br /> 공부시간(h)
          </Title>
          <TimeHis>{props.monthTime}</TimeHis>
        </TimeCard>
        <TimeCard>
          <Title>
            이번 주 <br /> 공부시간(h)
          </Title>
          <TimeHis>{props.monthTime}</TimeHis>
        </TimeCard>
        <TimeCard>
          <Title>
            오늘 <br /> 공부시간(h)
          </Title>
          <TimeHis>{props.dayTime}</TimeHis>
        </TimeCard>
      </ContentS>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const TitleS = styled.div`
  font-family: NotoSansSemiBold;
  color: ${({ theme }) => theme.colors.black01};
  font-size: 20px;
`;

const ContentS = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  gap: 25px;
`;

const TimeCard = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;

const Title = styled.span`
  font-family: NotoSansMedium;
  text-aligns: center;
  font-size: 20px;
`;

const TimeHis = styled.span`
  font-family: NotoSansLight;
  font-size: 50px;
  color: ${({ theme }) => theme.colors.highlight};
`;

export default MyHistoryTime;
