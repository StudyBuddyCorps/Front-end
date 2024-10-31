import styled from "styled-components";
import TimelineCard from "components/feedback/TimelineCard";
import ScoreCard from "components/feedback/ScoreCard";
import DonutChart from "components/feedback/DonutCard";
import CommentsCard from "components/feedback/CommentsCard";
import StudyResultBar from "components/feedback/StudyResultBar";
import StudyResultLine from "components/feedback/StudyResultLine";
import Button from "components/common/Button";

const StudyRoomFinish = () => {
  const name = "배주헝";
  const totalTime = "2h 50m 42s";
  const timelineData = [
    { start: "00:51:01", end: "00:54:09", feedback: "졸지마" },
    { start: "01:30:00", end: "01:35:00", feedback: "아직도 자니?!" },
  ];

  return (
    <Wrapper>
      <Header>
        <Title>Report</Title>
        <SubTitle>
          {" "}
          <Name>{name}</Name>님, 수고하셨습니다.
        </SubTitle>
      </Header>
      <Container>
        <Item1>
          <TimelineCard totalTime={totalTime} />
        </Item1>
        <Item2>
          <ScoreCard />
        </Item2>
        <Item3>
          <CommentsCard />
        </Item3>
        <Item4>
          <DonutChart />
        </Item4>
        <Item5>
          <StudyResultBar />
        </Item5>
        <Item6>
          <StudyResultLine />
        </Item6>
      </Container>
      <ButtonWrapper>
        <Button width="5rem" onClick={() => (window.location.href = "/home")}>
          홈으로
        </Button>
      </ButtonWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  background-color: #1b2738;
  justify-content: center;
  flex-direction: column;
  color: ${({ theme }) => theme.colors.white02};
  padding-bottom: 3rem;
`;

const Header = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: 3rem;
  margin-bottom: 4rem;
  margin-left: 3rem;
  flex-direction: column;
`;

const Title = styled.div`
  font-family: NotoSansExtraBold;
  font-size: 36px;
  color: ${({ theme }) => theme.colors.white02};
`;

const SubTitle = styled.div`
  font-family: NotoSansLight;
  font-size: 24px;
  color: ${({ theme }) => theme.colors.white02};
`;

const Name = styled.span`
  color: ${({ theme }) => theme.colors.main};
`;

const Container = styled.div`
  display: grid;
  grid-template-rows: repeat(5);
  grid-template-columns: 4fr 5fr;
  gap: 2.5rem;
  padding: 2rem;
  margin-left: 3rem;
  margin-right: 3rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const Item1 = styled.div`
  grid-column: span 2 / span 2;
`;

const Item2 = styled.div`
  grid-row-start: 2;
`;

const Item3 = styled.div`
  grid-column-start: 1;
  grid-row-start: 3;
`;

const Item4 = styled.div`
  grid-row: span 2 / span 2;
  grid-column-start: 2;
  grid-row-start: 2;
`;

const Item5 = styled.div`
  grid-column: span 2 / span 2;
  grid-row-start: 4;
`;

const Item6 = styled.div`
  grid-column: span 2 / span 2;
  grid-row-start: 5;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 5rem;
`;

export default StudyRoomFinish;
