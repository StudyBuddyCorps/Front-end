import { GetStudyFinalRecord } from "DTO/record/StudyRecord.dto";
import { getFinalResult } from "api/record";

export const handleFinalResult = async (data: GetStudyFinalRecord) => {
  try {
    const response = await getFinalResult(data);
    if (response.status == 200) {
      // 성공적으로 정보를 가져옴
      return {
        ok: true,
        studyRecord: response,
      };
    }
  } catch (error) {
    return { ok: false, error: error as string };
  }
};
