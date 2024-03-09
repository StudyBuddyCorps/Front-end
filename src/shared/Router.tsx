import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  Main,
  Login,
  Join,
  Home,
  Group,
  GroupMain,
  Calendar,
  MemberCalendar,
  Setting,
  StudyRoom,
  StudyRoomPomodoro,
  StudyRoomSetting,
  StudyRoomFinish,
} from "../pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/home" element={<Home />} />
        <Route path="/group" element={<Group />} />
        <Route path="/group/:groupId" element={<GroupMain />} />
        <Route path="/group/:groupId/:memberId" element={<MemberCalendar />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/room/:rommId" element={<StudyRoom />} />
        <Route path="/room/:roomId" element={<StudyRoomPomodoro />} />
        <Route path="/room" element={<StudyRoomSetting />} />
        <Route path="/room/:roomId/result" element={<StudyRoomFinish />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;