import { getCalendar, getDateRecord, updateStudyRecord } from "api/calendar";

export const handleGetCalendar = async (yearMonth: string) => {
  try {
    const response = await getCalendar(yearMonth);
    if (response.status == 200) {
      if (response.data.success) {
        return {
          ok: true,
          data: response.data,
        };
      } else {
        // 정보가 없음
        return {
          ok: false,
        };
      }
    }
  } catch (error) {
    return { ok: false, error: error as string };
  }
};

export const handlePrevRecord = async (yearMonth: string, date: number) => {
  try {
    const response = await getDateRecord({ yearMonth, date });
    if (response.status == 200) {
      if (response.data.success) {
        // 성공적으로 정보를 가져옴
        console.log(response, "이건 이전 정보");
        return {
          ok: true,
          data: response.data,
        };
      } else {
        // 정보가 없음
        return {
          ok: false,
        };
      }
    }
  } catch (error) {
    return { ok: false, error: error as string };
  }
};

export const handleUpadteRecord = async (
  yearMonth: string,
  date: number,
  studyRecordId: string
) => {
  try {
    const response = await updateStudyRecord({
      yearMonth,
      studyRecordId,
      date,
    });
    if (response.status == 200) {
      if (response.data.success) {
        return {
          ok: true,
          data: response.data,
        };
      } else {
        return {
          ok: false,
        };
      }
    }
  } catch (error) {
    return { ok: false, error: error as string };
  }
};
