import { Card, CardTitle } from "components/common/Card";
import styled from "styled-components";
import { LinearProgress } from "@mui/material";
import theme from "styles/theme";

export default function ScoreCard() {
  const score = 50;
  return (
    <Card>
      <Container>
        <CardTitleArea>
          <CardTitle>나의 집중도</CardTitle>
          <Score>{score}점</Score>
        </CardTitleArea>
        <ItemArea>
          <Item>
            <Label>총 공부시간</Label>
            <Value>2h 50min</Value>
          </Item>
          <LinearProgress
            variant="determinate"
            value={70}
            sx={{
              width: "100%",
              height: "20%",
              mb: 2,
              borderRadius: 5,
            }}
          />
          <Item>
            <Label>순공시간</Label>
            <Value>1h 30m</Value>
          </Item>
          <LinearProgress
            variant="determinate"
            value={50}
            sx={{ width: "100%", height: "20%", mb: 2, borderRadius: 5 }}
          />
          <Item>
            <Label>피드백 받은 시간</Label>
            <Value>36m</Value>
          </Item>
          <LinearProgress
            variant="determinate"
            value={20}
            sx={{ width: "100%", height: "20%", borderRadius: 5 }}
          />
        </ItemArea>
      </Container>
    </Card>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const CardTitleArea = styled.div`
  display: flex;
  flex-direction: column;
`;

const Score = styled.span`
  font-size: 5rem;
  font-family: NotoSansMedium;
  color: ${({ theme }) => theme.colors.black01};
`;

const ItemArea = styled.div`
  width: 60%;
  font-size: 2rem;
  font-family: NotoSansMedium;
`;

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Label = styled.span`
  font-size: 1rem;
  font-family: NotoSansMedium;
  color: ${({ theme }) => theme.colors.black00};
`;

const Value = styled.span`
  font-size: 1rem;
  font-family: NotoSansMedium;
  color: ${({ theme }) => theme.colors.black00};
`;
