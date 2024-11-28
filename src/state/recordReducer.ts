import { Feedback } from "DTO/record/Feedback.dto";

export interface RecordState {
  totalTime: number;
  feedbackList: Feedback[];
  feedTime: number;
  sleepCount: number;
  phoneCount: number;
  postureCount: number;
  advice: string;
  studyRecordId: string;
  createdAt?: Date;
}

type Action = { type: "SET_STUDY_DATA"; record: RecordState };

export const initialRecord: RecordState = {
  totalTime: 0,
  feedbackList: [],
  feedTime: 0,
  sleepCount: 0,
  phoneCount: 0,
  postureCount: 0,
  advice: "",
  studyRecordId: "",
};

export const recordReducer = (
  state: RecordState,
  action: Action
): RecordState => {
  switch (action.type) {
    case "SET_STUDY_DATA":
      return {
        ...state,
        ...action.record,
      };
    default:
      return state;
  }
};
