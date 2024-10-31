import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Main,
  Account,
  Home,
  Group,
  GroupMain,
  GroupGenerate,
  Calendar,
  MemberCalendar,
  Setting,
  StudyRoom,
  StudyRoomPomodoro,
  StudyRoomSetting,
  StudyRoomFinish,
  ResetPwd,
} from "../pages";
import Sidebar from "./Sidebar";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/account" element={<Account />} />
        <Route path="/account/reset/password" element={<ResetPwd />} />
        <Route path="/studyResult" element={<StudyRoomFinish />} />

        {/* 사이드바가 보이는 페이지 */}
        <Route element={<Sidebar />}>
          <Route path="/home" element={<Home />} />
          <Route path="/group" element={<Group />} />
          <Route path="/group/:groupName" element={<GroupMain />} />
          <Route
            path="/group/:groupId/:memberId"
            element={<MemberCalendar />}
          />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/setting" element={<Setting />} />
        </Route>
        <Route path="/studyroom/:roomId" element={<StudyRoom />} />
        <Route path="/studyroom/:roomId" element={<StudyRoomPomodoro />} />
        <Route path="/studyroom" element={<StudyRoomSetting />} />
        <Route path="/studyroom/:roomId/result" element={<StudyRoomFinish />} />
        <Route path="/newGroup" element={<GroupGenerate />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
