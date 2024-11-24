import { Card, CardTitle } from "components/common/Card";
import styled from "styled-components";
import { LinearProgress } from "@mui/material";
import theme from "styles/theme";
import { timeToShortString, timeToString } from "utils/timeLine";

interface ScoreCardProps {
  totalTime: number;
  feedTime: number;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ totalTime, feedTime }) => {
  const actualTime = totalTime - feedTime;
  const total = timeToShortString(totalTime);
  const feed = timeToShortString(feedTime);
  const real = timeToShortString(actualTime);
  const score = Math.round((actualTime / totalTime) * 100);

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
            <Value>{total}</Value>
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
            <Value>{real}</Value>
          </Item>
          <LinearProgress
            variant="determinate"
            value={Math.round((actualTime / totalTime) * 70)}
            sx={{ width: "100%", height: "20%", mb: 2, borderRadius: 5 }}
          />
          <Item>
            <Label>피드백 받은 시간</Label>
            <Value>{feed}</Value>
          </Item>
          <LinearProgress
            variant="determinate"
            value={Math.round((feedTime / totalTime) * 70)}
            sx={{ width: "100%", height: "20%", borderRadius: 5 }}
          />
        </ItemArea>
      </Container>
    </Card>
  );
};
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

export default ScoreCard;
