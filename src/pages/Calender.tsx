import MyCalendar from "components/calendar/calendar";
import { Box, Heading, Text } from "@chakra-ui/react";

const Calendar = () => {
  return (
    <Box>
      <Heading size="lg">Calendar</Heading>
      <Text>
        운을 믿지 말고 요행을 기대 말고 나의 철저한 준비와 노력만을 믿어라
      </Text>
      <Box display="flex" justifyContent="space-between">
        <Box width="45%" border="1px solid black" p={4}>
          <MyCalendar h="100%" minW="100%" selectRange={false} />
        </Box>
        <Box width="45%" border="1px solid black" p={4}>
          {/* 두 번째 박스 */}
          <Text>두 번째 박스</Text>
        </Box>
      </Box>
      <Box>
        <Text mt={4}>박스 아래에 넣을 글자</Text>
      </Box>
    </Box>
  );
};

export default Calendar;
