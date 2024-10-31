import { Card, CardHeader, CardTitle } from "components/common/Card";
import styled from "styled-components";

export default function CommentsCard() {
  const content =
    "많이 피곤하신가요? 그럴 때는 양치를 하고 오는게 도움이 됩니다.\n휴대폰을 2G폰으로 바꾸십시오.";
  return (
    <Card>
      <CardHeader>
        <CardTitle>개선할 점</CardTitle>
      </CardHeader>
      <Description>{content}</Description>{" "}
    </Card>
  );
}

const Description = styled.div`
  line-height: 1.5;
  overflow-wrap: break-word;
  font-size: 1.5rem;
  font-family: NotoSansLight;
  white-space: pre;
  color: ${({ theme }) => theme.colors.black01};
`;
