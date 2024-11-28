import { Card, CardHeader, CardTitle } from "components/common/Card";
import styled from "styled-components";

interface CommentsProps {
  advice: string;
}

const CommentsCard: React.FC<CommentsProps> = ({ advice }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>개선할 점</CardTitle>
      </CardHeader>
      <Description>{advice}</Description>{" "}
    </Card>
  );
};

const Description = styled.div`
  margin-top: 5px;
  line-height: 1.5;
  overflow-wrap: break-word;
  font-size: 1.5rem;
  font-family: NotoSansLight;
  white-space: normal;
  color: ${({ theme }) => theme.colors.black01};
  max-height: 10rem; /* 최대 높이 지정 */
  overflow-y: auto; /* 스크롤이 필요할 경우 스크롤 표시 */
`;

export default CommentsCard;
