import styled from "styled-components";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "components/common/Card";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";

const totalD = [19, 14, 7, 16, 12, 15];
const sleepD = [12, 4, 2, 5, 4, 9];
const phoneD = [1, 2, 0, 8, 3, 3];
const postureD = [2, 5, 1, 3, 3, 2];
const attentionD = [4, 3, 4, 0, 2, 1];
const xLabels = ["21일전", "14일전", "7일전", "3일전", "어제", "오늘"];

const colors = ["black", "#FF69B4", "#90EE90", "#FFA500", "#00CED1"];
const labels = ["전체", "졸림", "휴대폰", "자세불량", "집중력 저하"];

export default function StudyResultLine() {
  const [tooltipData, setTooltipData] = useState(null);

  return (
    <Card>
      <CardHeader>
        <CardTitle>일별 누적 피드백 횟수</CardTitle>
      </CardHeader>

      <ChartContainer>
        <LineChart
          width={1000}
          height={600}
          series={[
            { data: totalD, label: labels[0] },
            { data: sleepD, label: labels[1] },
            { data: phoneD, label: labels[2] },
            { data: postureD, label: labels[3] },
            { data: attentionD, label: labels[4] },
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          yAxis={[{ id: "leftAxisId" }]}
        />
      </ChartContainer>
    </Card>
  );
}

const ChartContainer = styled.div`
  display: flex;
`;
