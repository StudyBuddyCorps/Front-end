import { DateRecord } from "DTO/calendar/DateRecord.dto";
import React, { createContext, useReducer, useContext, ReactNode } from "react";

// 상태의 타입 정의
// type StateType = {
//   yearMonth: string;
//   selectedDay: number | 0;
//   isSidebarVisible: boolean;
// };
type StateType = {
  yearMonth?: string;
  dateRecord: DateRecord[];
  monthlyTime: number;
  weeklyTime: number;
  dailyTime: number;
  selectedDay: number | 0;
  isSidebarVisible: boolean;
};

// 액션의 타입 정의
type ActionType =
  | { type: "SET_YEAR_MONTH"; yearMonth: string }
  | { type: "SET_CALENDAR"; data: StateType }
  | { type: "SET_CALENDAR_INIT" }
  | { type: "SET_SELECTED_DAY"; date: number }
  | { type: "CLOSE_SIDEBAR" };

// 초기 상태
// const initialState: StateType = {
//   yearMonth: "",
//   selectedDay: 0,
//   isSidebarVisible: false,
// };
const initialState: StateType = {
  yearMonth: "",
  dateRecord: [],
  monthlyTime: 0,
  weeklyTime: 0,
  dailyTime: 0,
  selectedDay: 0,
  isSidebarVisible: false,
};

const CalendarContext = createContext<StateType>(initialState);
const CalendarDispatchContext = createContext<React.Dispatch<ActionType>>(
  () => {}
);

const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState);

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        {children}
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  );
};

const calendarReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_YEAR_MONTH": // 현재 월별 달력
      return {
        ...state,
        yearMonth: action.yearMonth,
        isSidebarVisible: false,
      };
    case "SET_CALENDAR": // 달력 정보
      return {
        ...state,
        ...action.data,
      };
    case "SET_CALENDAR_INIT": // 달력 초기화
      return {
        ...state,
        dateRecord: [],
        monthlyTime: 0,
        weeklyTime: 0,
        dailyTime: 0,
        selectedDay: 0,
        isSidebarVisible: false,
      };
    case "SET_SELECTED_DAY": // 선택한 날짜를 변경한다.
      return { ...state, selectedDay: action.date, isSidebarVisible: true };
    case "CLOSE_SIDEBAR": // 사이드 바를 닫는다.
      return { ...state, selectedDay: 0, isSidebarVisible: false };
    default:
      throw new Error("Unknown action: " + action);
  }
};

export const useCalendarState = () => useContext(CalendarContext);
export const useCalendarDispatch = () => useContext(CalendarDispatchContext);

export default CalendarProvider;
