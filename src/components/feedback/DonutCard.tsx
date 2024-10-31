import styled from "styled-components";
import { Card, CardHeader, CardTitle } from "components/common/Card";
import { PieChart, pieArcLabelClasses } from "@mui/x-charts";
import { DefaultizedPieValueType } from "@mui/x-charts/models";
import theme from "styles/theme";

export default function DonutChart() {
  const data = [
    { value: 40, label: "졸림" },
    { value: 10, label: "자세 불량" },
    { value: 38, label: "휴대폰" },
    { value: 12, label: "집중력 저하" },
  ];
  const TOTAL = data.map((item) => item.value).reduce((a, b) => a + b, 0);
  const getArcLabel = (params: DefaultizedPieValueType) => {
    const percent = params.value / TOTAL;
    return `${(percent * 100).toFixed(0)}%`;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>받은 피드백</CardTitle>
      </CardHeader>
      <Container>
        <PieChart
          series={[
            {
              data,
              arcLabel: getArcLabel,
              innerRadius: 60,
              outerRadius: 150,
            },
          ]}
          colors={[
            theme.colors.feeback01,
            theme.colors.feeback02,
            theme.colors.feeback03,
            theme.colors.feeback04,
          ]}
          width={500}
          height={500}
          margin={{ top: 50, bottom: 100, left: 100, right: 100 }}
          slotProps={{
            legend: {
              direction: "row",
              position: { vertical: "bottom", horizontal: "middle" },
              padding: 0,
              labelStyle: {
                fontSize: 20,
                fontFamily: "NotoSansMedium",
                fill: "black",
              },
            },
          }}
          sx={{
            [`& .${pieArcLabelClasses.root}`]: {
              fill: "white",
              fontSize: 14,
            },
            "& .MuiCharts-pieArc": {
              boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
            },
            "& .MuiCharts-pieArcLabel": {
              fontSize: 12,
              fontWeight: "bold",
              fill: "white",
            },
          }}
        />
      </Container>
    </Card>
  );
}

const Container = styled.div`
  display: flex;
  padding: 0;
`;
