import React, { useState } from "react";
import styled from "styled-components";
import { Card, CardHeader, CardTitle } from "components/common/Card";
import { Box, Typography } from "@mui/material";
import { ProgressBar, FeedbackBox } from "./TimeLine";

interface TimelineCardProps {
  totalTime: string;
}

interface Feedback {
  start: number;
  end: number;
  content: string;
  time: string;
}

const feedbackData: Feedback[] = [
  { start: 10, end: 15, content: "졸지마!", time: "00:51:01 ~ 00:54:09" },
  { start: 30, end: 32, content: "자세!", time: "01:20:15 ~ 01:22:00" },
  { start: 80, end: 85, content: "집중!", time: "02:15:30 ~ 02:18:00" },
];

const TimelineCard: React.FC<TimelineCardProps> = ({ totalTime }) => {
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );

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
            <Content>{selectedFeedback.content}</Content>
            <Time>{selectedFeedback.time}</Time>
          </FeedbackContent>
        )}
      </CardHeader>
      <TotalTime>{totalTime}</TotalTime>
      <ProgressBar borderRadius={50} height="2rem">
        {feedbackData.map((feedback, index) => (
          <FeedbackBox
            key={index}
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
