import styled from "styled-components";
import { useState } from "react";
import { Card, CardHeader, CardTitle } from "components/common/Card";
import { Box, Typography } from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { PrevRecord } from "DTO/calendar/DateRecord.dto";

const xLabels = ["21일전", "14일전", "7일전", "3일전", "어제", "오늘"];

const colors = ["black", "#FF69B4", "#90EE90", "#FFA500", "#00CED1"];
const labels = ["전체", "졸림", "휴대폰", "자세불량", "집중력 저하"];

const StudyResultLine: React.FC<{ prevResult: PrevRecord[] }> = ({
  prevResult,
}) => {
  if (prevResult.length === 0) {
    return <div>No data available</div>; // prevResult가 비어 있을 때 처리
  }
  //const [tooltipData, setTooltipData] = useState(null);

  const sleepD = prevResult.map((record) => record.sleepCount);
  const phoneD = prevResult.map((record) => record.phoneCount);
  const postureD = prevResult.map((record) => record.postureCount);
  const totalD = prevResult.map(
    (record) => record.sleepCount + record.phoneCount + record.postureCount
  );

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
          ]}
          xAxis={[{ scaleType: "point", data: xLabels }]}
          yAxis={[{ id: "leftAxisId" }]}
        />
      </ChartContainer>
    </Card>
  );
};

const ChartContainer = styled.div`
  display: flex;
`;

export default StudyResultLine;
