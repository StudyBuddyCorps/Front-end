import {
  GetDateRecordRequest,
  PutDateRecordRequest,
} from "DTO/calendar/DateRecord.dto";
import axios from "./index";

export const createCalendar = () => {
  return axios.post("/calendar/");
};

export const getCalendar = (yearMonth: string) => {
  return axios.get(`/calendar/${yearMonth}`);
};

export const getDateRecord = (data: GetDateRecordRequest) => {
  return axios.get("/calendar/dateRecord", { params: data });
};

export const updateStudyRecord = (data: PutDateRecordRequest) => {
  return axios.put("/calendar/dateRecord", data);
};
