import React, { createContext, useReducer, useContext, ReactNode } from "react";

// 상태의 타입 정의
type StateType = {
  selectedDay: number | null; // 어떤 일자가 클릭되었는지 저장
  isSidebarVisible: boolean; // 사이드바가 표시되는지 여부
};

// 액션의 타입 정의
type ActionType =
  | { type: "SET_SELECTED_DAY"; payload: number }
  | { type: "TOGGLE_SIDEBAR"; payload: boolean };

// 초기 상태
const initialState: StateType = {
  selectedDay: null,
  isSidebarVisible: false,
};

// Reducer 함수 : state에 대한 logic을 넣는 곳
// state 값, action 객체를 인자를 받고 다음 state를 반환
const calendarReducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case "SET_SELECTED_DAY": // action.type이 다음과 같으면
      return { ...state, selectedDay: action.payload }; // 다음 state 반환 (react가 state에 설정하게 될 값)
    case "TOGGLE_SIDEBAR":
      return { ...state, isSidebarVisible: action.payload };
    default:
      return state;
  }
};

// Context 생성
const CalendarContext = createContext<StateType>(initialState); // StateType으로 타입 지정
const CalendarDispatchContext = createContext<React.Dispatch<ActionType>>(
  () => {}
); // Dispatch 타입으로 지정

// Hook을 통해 Context에 접근
export const useCalendarState = () => useContext(CalendarContext);
export const useCalendarDispatch = () => useContext(CalendarDispatchContext);

// Provider로 상태를 하위 컴포넌트에 전달
const CalendarProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(calendarReducer, initialState); // Context에서 reducer를 사용하기 위함

  return (
    <CalendarContext.Provider value={state}>
      <CalendarDispatchContext.Provider value={dispatch}>
        {children}
      </CalendarDispatchContext.Provider>
    </CalendarContext.Provider>
  );
};
// Context를 생성한다.
// State과 dispatch 함수를 context에 넣는다.

export default CalendarProvider;
