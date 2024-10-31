import { useCalendarState } from "./CalendarContext";
import styled from "styled-components";

const StudyHistory = () => {
  const { selectedDay, isSidebarVisible } = useCalendarState();

  if (!isSidebarVisible) return null; // Sidebar가 보이지 않도록 설정
  return (
    <div>
      <h2>Selected Day: {selectedDay}</h2>
      {/* 선택한 Day에 따른 동적인 내용 표시 */}
    </div>
  );
};

const Content = styled.div`
  display: flex;
  align-items: center;
  padding: 0px 40px;
  margin-bottom: 10px;

  .right {
    flex: 1;
  }

  .left {
    flex: 1.5;
    display: flex;
  }
`;

export default StudyHistory;
