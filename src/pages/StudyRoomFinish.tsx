import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import TimelineCard from "components/feedback/TimelineCard";
import ScoreCard from "components/feedback/ScoreCard";
import DonutChart from "components/feedback/DonutCard";
import CommentsCard from "components/feedback/CommentsCard";
import StudyResultBar from "components/feedback/StudyResultBar";
import StudyResultLine from "components/feedback/StudyResultLine";
import Button from "components/common/Button";
import { handleFinalResult } from "services/recordServices";
import { handlePrevRecord } from "services/calendarServices";
import { Feedback } from "DTO/record/Feedback.dto";

const StudyRoomFinish = () => {
  const { roomId } = useParams(); // roomId를 URL 파라미터에서 추출
  const [totalTime, setTotalTime] = useState<number>(0);
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [feedTime, setFeedTime] = useState<number>(0);
  const [sleepCount, setSleep] = useState<number>(0);
  const [phoneCount, setPhone] = useState<number>(0);
  const [postureCount, setPosture] = useState<number>(0);
  const [advice, setAdvice] = useState<string>("");

  useEffect(() => {
    const fetchData = async (roomId: string) => {
      try {
        const response = await handleFinalResult({ roomId }); // roomId를 사용하여 응답을 받음
        if (response?.ok === false) {
          return;
        }
        console.log(response);

        const totalTimeFromResponse = response?.studyRecord?.data?.totalTime;
        const feedListFromResponse = response?.studyRecord?.data?.feedList;
        const feedTimeResponse = response?.studyRecord?.data?.feedTime || [];
        const sleepResponse = response?.studyRecord?.data?.sleepCount;
        const phoneResponse = response?.studyRecord?.data?.phoneCount;
        const postureResponse = response?.studyRecord?.data?.postureCount;
        const adviceResponse = response?.studyRecord?.data?.advice;
        setTotalTime(totalTimeFromResponse);
        setFeedbackList(feedListFromResponse);
        setFeedTime(feedTimeResponse);
        setSleep(sleepResponse);
        setPhone(phoneResponse);
        setPosture(postureResponse);
        setAdvice(adviceResponse);

        // 존재하는 경우에 대해서 오늘부터 21일 전까지의 날짜를 배열로 계산
        const today = new Date(response?.studyRecord?.data.createdAt);
        const dates = [
          today, // 오늘
          new Date(today.getDate() - 1 * 24 * 60 * 60 * 1000), // 어제
          new Date(today.getDate() - 3 * 24 * 60 * 60 * 1000), // 3일 전
          new Date(today.getDate() - 7 * 24 * 60 * 60 * 1000), // 7일 전
          new Date(today.getDate() - 14 * 24 * 60 * 60 * 1000), // 14일 전
          new Date(today.getDate() - 21 * 24 * 60 * 60 * 1000), // 21일 전
        ];

        // 각 날짜에 대해 `handlePrevRecord`를 호출하는 배열을 생성
        const promises = dates.map((date) => {
          const yearMonth = `${date.getFullYear()}-${(date.getMonth() + 1)
            .toString()
            .padStart(2, "0")}`;
          const day = date.getDate();
          return handlePrevRecord(yearMonth, day); // `handlePrevRecord` 호출
        });

        // 여러 개의 `handlePrevRecord` 호출을 동시에 처리하고 개별 결과를 반환
        const responses = await Promise.allSettled(promises);

        responses.forEach((result, index) => {
          if (result.status === "fulfilled") {
            console.log(
              `Success for date ${dates[index].toDateString()}:`,
              result.value
            );
          } else {
            console.error(
              `Failed for date ${dates[index].toDateString()}:`,
              result.reason
            );
          }
        });
      } catch (error) {
        console.error("Error during fetchData:", error);
      }
    };

    if (roomId) {
      fetchData(roomId);
    }
  }, []);

  const name = "배주헝";

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
          <TimelineCard totalTime={totalTime} feedList={feedbackList} />
        </Item1>
        <Item2>
          <ScoreCard totalTime={totalTime} feedTime={feedTime} />
        </Item2>
        <Item3>
          <CommentsCard advice={advice} />
        </Item3>
        <Item4>
          <DonutChart
            sleep={sleepCount}
            phone={phoneCount}
            posture={postureCount}
          />
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
