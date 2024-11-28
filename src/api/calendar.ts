import { DateRecordRequest } from "DTO/calendar/DateRecord.dto";
import axios from "./index"; // instance가 담겨있음

// export const createCalendar = (data: ) => {
//   return axios.post("/calendar/", data);
// };

export const getDateRecord = (data: DateRecordRequest) => {
  return axios.get("/calendar/dateRecord", { params: data });
};

// export const updateStudyRecord = (data: ) => {
//   return axios.put("/calendar/dateRecord", data);
// };
