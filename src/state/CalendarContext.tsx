import { DateRecord } from "DTO/calendar/DateRecord.dto";
import React, {
  useEffect,
  createContext,
  useReducer,
  useContext,
  ReactNode,
} from "react";
import {
  handleGetCalendar,
  handlePostCalendar,
} from "services/calendarServices";
import { getYearMonth } from "utils/timeLine";

type StateType = {
  yearMonth?: string | null;
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

const initialState: StateType = {
  yearMonth: null,
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

  useEffect(() => {
    // 달력 초기화
    if (!state.yearMonth) {
      const yearMonth = getYearMonth(new Date());
      dispatch({
        type: "SET_YEAR_MONTH",
        yearMonth: yearMonth,
      });

      handleGetCalendar(yearMonth)
        .then((response) => {
          if (response?.ok) {
            const result = response.data.data;
            dispatch({
              type: "SET_CALENDAR",
              data: {
                dateRecord: result.dateRecord,
                monthlyTime: result.monthlyTime,
                weeklyTime: result.weeklyTime,
                dailyTime: result.dailyTime,
                selectedDay: 0,
                isSidebarVisible: false,
              },
            });
          } else {
            // 없다면
            return handlePostCalendar();
          }
        })
        .then((newCalendarResponse) => {
          if (newCalendarResponse?.ok) {
            dispatch({
              type: "SET_CALENDAR_INIT",
            });
          }
        })
        .catch((error) => {});
    }
  }, [state.yearMonth]); // 달력이 없을 때만 호출

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
