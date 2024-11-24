import React, { useState } from "react";
import styled from "styled-components";
import { Card, CardHeader, CardTitle } from "components/common/Card";
import { ProgressBar, FeedbackBox } from "./TimeLine";
import { timeToString } from "utils/timeLine";
import { Feedback } from "DTO/record/Feedback.dto";

interface TimelineCardProps {
  totalTime: number;
  feedList: Feedback[];
}

const TimelineCard: React.FC<TimelineCardProps> = ({ totalTime, feedList }) => {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  ); // 선택한 피드백 박스

  const handleClick = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
  };

  const handleClose = () => {
    setSelectedFeedback(null);
  };

  return (
    <Card background="#FFDA58">
      <CardHeader>
        <CardTitle>Total Timeline</CardTitle>
        {selectedFeedback && (
          <FeedbackContent>
            <Content>{selectedFeedback.feedType}</Content>
            <Time>{selectedFeedback.time}</Time>
          </FeedbackContent>
        )}
      </CardHeader>
      <TotalTime>{timeToString(totalTime)}</TotalTime>
      <ProgressBar borderRadius={50} height="2rem">
        {feedList.map((feedback) => (
          <FeedbackBox
            totalTime={totalTime}
            start={feedback.start}
            end={feedback.end}
            onClick={() => handleClick(feedback)}
          ></FeedbackBox>
        ))}
      </ProgressBar>
    </Card>
  );
};

const TotalTime = styled.div`
  font-size: 4rem;
  font-family: NotoSansBold;
  color: ${(props) => props.theme.colors.black01};
  margin-bottom: 2rem;
`;
const FeedbackContent = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  right: 5%;
  width: 30rem;
  background-color: ${({ theme }) => theme.colors.white02};
  padding: 1rem;
  border-radius: 4px;
  z-index: 2;
`;

const Content = styled.span`
  color: ${({ theme }) => theme.colors.highlight};
  font-size: 1.5rem;
  font-family: NotoSansBold;
`;

const Time = styled.span`
  color: ${({ theme }) => theme.colors.black01};
  font-size: 1.5rem;
  font-family: NotoSansLight;
`;
export default TimelineCard;
