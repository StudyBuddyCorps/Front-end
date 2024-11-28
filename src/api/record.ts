import { GetStudyFinalRecord } from "DTO/record/StudyRecord.dto";
import axios from "./index"; // instance가 담겨있음

export const getFinalResult = (data: GetStudyFinalRecord) => {
  return axios.post("/record/final", data);
};
