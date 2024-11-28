import { getDateRecord } from "api/calendar";

export const handlePrevRecord = async (yearMonth: string, date: number) => {
  try {
    const response = await getDateRecord({ yearMonth, date });
    if (response.status == 200) {
      if (response.data.success) {
        // 성공적으로 정보를 가져옴
        console.log(response, "이건 이전 정보");
        return {
          ok: true,
          data: response,
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
