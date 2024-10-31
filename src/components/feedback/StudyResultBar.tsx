import styled from "styled-components";
import { Card, CardHeader, CardTitle } from "components/common/Card";
import { Box, Typography } from "@mui/material";
import { BarChart } from "@mui/x-charts";

export default function StudyResultBar() {
  const data = [
    { date: "21일전", current: 80, total: 60 },
    { date: "14일전", current: 40, total: 20 },
    { date: "7일전", current: 70, total: 50 },
    { date: "3일전", current: 90, total: 70 },
    { date: "어제", current: 60, total: 40 },
    { date: "오늘", current: 30, total: 0 },
  ];

  const chartData = [
    {
      category: "21일전",
      value: data[0].total,
      value2: data[0].current,
    },
    {
      category: "14일전",
      value: data[1].total,
      value2: data[1].current,
    },
    {
      category: "7일전",
      value: data[2].total,
      value2: data[2].current,
    },
    {
      category: "3일전",
      value: data[3].total,
      value2: data[3].current,
    },
    {
      category: "어제",
      value: data[4].total,
      value2: data[4].current,
    },
    {
      category: "오늘",
      value: data[5].total,
      value2: data[5].current,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>일별 누적 공부 시간</CardTitle>
        <Legend>
          <LegendItem>
            <LegendCircle sx={{ bgcolor: "dodgerblue" }} />
            하루 총 공부 시간
          </LegendItem>
          <LegendItem>
            <LegendCircle sx={{ bgcolor: "darkviolet" }} />
            현재 시간까지 공부 시간
          </LegendItem>
        </Legend>
      </CardHeader>
      <ChartContainer>
        <BarChart
          xAxis={[{ scaleType: "band", dataKey: "category" }]}
          series={[
            {
              dataKey: "value",
              color: "dodgerblue",
            },
            {
              dataKey: "value2",
              color: "darkviolet",
            },
          ]}
          dataset={chartData}
          width={2000}
          height={600}
        />
      </ChartContainer>
    </Card>
  );
}

const ChartContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem;
  width: 100%;
`;

const Legend = styled.div`
  display: flex;
  align-items: left;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
  font-family: NotoSansLight;
  color: ${(props) => props.theme.colors.black03};
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.2rem;
`;

const LegendCircle = styled(Box)`
  width: 10px;
  height: 10px;
  border-radius: 50%;
`;
