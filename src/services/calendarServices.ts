import {
  createCalendar,
  getCalendar,
  getDateRecord,
  getTodayTime,
  updateStudyRecord,
} from "api/calendar";

export const handlePostCalendar = async () => {
  // 초기값만 설정
  try {
    const response = await createCalendar();
    if (response.status == 200) {
      if (response.data.success) {
        // 달력 생성 성공
        return {
          ok: true,
        };
      } else {
        // 달력 생성 실패
        return {
          ok: false,
        };
      }
    }
  } catch (error) {
    return { ok: false, error: error as string };
  }
};

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
        return {
          ok: true,
          data: response.data.data,
        };
      } else {
        // 정보가 없음
        return {
          ok: false,
          data: null,
        };
      }
    }
  } catch (error) {
    return { ok: false, error: error as string };
  }
};

export const handleTodayTime = async (yearMonth: string) => {
  try {
    const response = await getTodayTime(yearMonth);
    if (response.status == 200) {
      if (response.data.success) {
        return {
          ok: true,
          data: response.data.data,
        };
      } else {
        // 정보가 없음
        return {
          ok: false,
          data: 0,
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
