import { useState, useEffect, useReducer } from "react";
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
import {
  handlePrevRecord,
  handleUpadteRecord,
} from "services/calendarServices";
import { getYearMonth } from "utils/timeLine";
import { initialRecord, recordReducer } from "state/recordReducer";
import { handleUserNickName } from "services/userServices";
import { PrevRecord } from "DTO/calendar/DateRecord.dto";

const StudyRoomFinish = () => {
  const [name, setName] = useState<string>("");
  const [record, dispatch] = useReducer(recordReducer, initialRecord);
  const { roomId } = useParams(); // roomId를 URL 파라미터에서 추출
  const [prevResult, setPrevResult] = useState<PrevRecord[]>([]);

  useEffect(() => {
    const fetchData = async (roomId: string) => {
      try {
        const nameRes = await handleUserNickName();
        if (nameRes?.ok == false) {
          throw new Error("회원이 존재하지 않습니다.");
        }
        const response = await handleFinalResult({ roomId }); // roomId를 사용하여 응답을 받음
        if (response?.ok === false) {
          throw new Error("공부 기록이 존재하지 않습니다.");
        }
        setName(nameRes?.data);
        const result = response?.data;

        dispatch({
          type: "SET_STUDY_DATA",
          record: {
            totalTime: result.totalTime,
            feedbackList: result.feedList,
            feedTime: result.feedTime,
            sleepCount: result.sleepCount,
            phoneCount: result.phoneCount,
            postureCount: result.postureCount,
            advice: result.advice,
            studyRecordId: result._id,
            createdAt: result.createdAt,
          },
        });

        // 존재하는 경우에 대해서 오늘부터 21일 전까지의 날짜를 배열로 계산
        const today = new Date(result.createdAt);
        const dates = [
          today,
          new Date(today.getTime() - 1 * 24 * 60 * 60 * 1000), // 어제
          new Date(today.getTime() - 3 * 24 * 60 * 60 * 1000), // 3일 전
          new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000), // 7일 전
          new Date(today.getTime() - 14 * 24 * 60 * 60 * 1000), // 14일 전
          new Date(today.getTime() - 21 * 24 * 60 * 60 * 1000), // 21일 전
        ];

        // 각 날짜에 대해 `handlePrevRecord`를 호출하는 배열을 생성
        const promises = dates.map((date) => {
          const yearMonth = getYearMonth(date);
          const day = date.getDate();
          return handlePrevRecord(yearMonth, day); // `handlePrevRecord` 호출
        });

        // 개별 결과 반환
        const responses = await Promise.allSettled(promises);

        responses.forEach((result, index) => {
          if (result.status === "fulfilled") {
            const newRecord = {
              date: dates[index],
              totalTime: result.value?.ok ? result.value.data.total_time : 0,
              feedTime: result.value?.ok ? result.value.data.feed_time : 0,
              sleepCount: result.value?.ok ? result.value.data.sleep_count : 0,
              phoneCount: result.value?.ok ? result.value.data.phone_count : 0,
              postureCount: result.value?.ok
                ? result.value.data.posture_count
                : 0,
            };

            // 상태를 직접 수정하는 것이 아니라 새로운 배열을 만들어서 업데이트
            setPrevResult((prev) => [...prev, newRecord]);
          } else {
            // Promise에서 실패 웅덥
            console.error(
              `Failed for date ${dates[index].toDateString()}:`,
              result.reason
            );
          }
        });

        setPrevResult((prev) =>
          [...prev].sort((a, b) => a.date.getTime() - b.date.getTime())
        ); // 이전 날짜 순으로 정렬

        // 오늘 자의 공부 데이터 추가
        setPrevResult((prev) => {
          const updatedPrevResult = [...prev]; // prev 배열 복사
          updatedPrevResult[5] = {
            ...updatedPrevResult[5], // 기존 데이터를 유지하고 업데이트
            totalTime: updatedPrevResult[5].totalTime + result.totalTime,
            feedTime: updatedPrevResult[5].feedTime + result.feedTime,
            sleepCount: updatedPrevResult[5].sleepCount + result.sleepCount,
            phoneCount: updatedPrevResult[5].phoneCount + result.phoneCount,
            postureCount:
              updatedPrevResult[5].postureCount + result.postureCount,
          };
          return updatedPrevResult; // 새로운 상태 반환
        });
      } catch (error) {
        console.error("Error during fetchData:", error);
      }
    };

    if (roomId) {
      fetchData(roomId);
    }
  }, [roomId]);

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
          <TimelineCard
            totalTime={record.totalTime}
            feedList={record.feedbackList}
          />
        </Item1>
        <Item2>
          <ScoreCard totalTime={record.totalTime} feedTime={record.feedTime} />
        </Item2>
        <Item3>
          <CommentsCard advice={record.advice} />
        </Item3>
        <Item4>
          <DonutChart
            sleep={record.sleepCount}
            phone={record.phoneCount}
            posture={record.postureCount}
          />
        </Item4>
        <Item5>
          <StudyResultBar prevResult={prevResult} />
        </Item5>
        <Item6>
          <StudyResultLine prevResult={prevResult} />
        </Item6>
      </Container>
      <ButtonWrapper>
        <Button
          width="5rem"
          onClick={() => {
            const today = new Date(record.createdAt!);
            const yearMonth = getYearMonth(today);
            const date = today.getDate();
            handleUpadteRecord(yearMonth, date, record.studyRecordId);
            window.location.href = "/home";
          }}
        >
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
