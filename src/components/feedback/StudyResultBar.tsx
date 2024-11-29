import styled from "styled-components";
import { Card, CardHeader, CardTitle } from "components/common/Card";
import { Box } from "@mui/material";
import { BarChart } from "@mui/x-charts";
import { PrevRecord } from "DTO/calendar/DateRecord.dto";

const StudyResultBar: React.FC<{ prevResult: PrevRecord[] }> = ({
  prevResult,
}) => {
  if (prevResult.length === 0) {
    return <div>No data available</div>; // prevResult가 비어 있을 때 처리
  }
  const chartData = [
    {
      category: "21일전",
      value: prevResult[0].totalTime,
      value2: prevResult[0].feedTime,
    },
    {
      category: "14일전",
      value: prevResult[1].totalTime,
      value2: prevResult[1].feedTime,
    },
    {
      category: "7일전",
      value: prevResult[2].totalTime,
      value2: prevResult[2].feedTime,
    },
    {
      category: "3일전",
      value: prevResult[3].totalTime,
      value2: prevResult[3].feedTime,
    },
    {
      category: "어제",
      value: prevResult[4].totalTime,
      value2: prevResult[4].feedTime,
    },
    {
      category: "오늘",
      value: prevResult[5].totalTime,
      value2: prevResult[5].feedTime,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>일별 누적 공부 시간</CardTitle>
        <Legend>
          <LegendItem>
            <LegendCircle sx={{ bgcolor: "dodgerblue" }} />
            하루 총 공부 시간(sec)
          </LegendItem>
          <LegendItem>
            <LegendCircle sx={{ bgcolor: "darkviolet" }} />
            하루 총 피드백 받은 시간(sec)
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
};

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

export default StudyResultBar;
