export const timeToString = (time: number): string => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes = `0${parseInt(minutes) % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  return `${getHours} : ${getMinutes} : ${getSeconds}`;
};

export const timeToShortString = (time: number): string => {
  const hours = Math.floor(time / 3600); // 시간 계산
  const minutes = Math.floor((time % 3600) / 60); // 분 계산
  const seconds = Math.floor(time % 60); // 초 계산

  if (hours === 0 && minutes === 0) {
    return `${seconds}sec`;
  }

  // `hours`가 0일 때는 분과 초만 표시
  if (hours === 0) {
    return `${minutes}min ${seconds}sec`;
  }

  // `hours`, `minutes`, `seconds` 모두 표시
  return `${hours}h ${minutes}min ${seconds}sec`;
};

export const getYearMonth = (date: Date): string => {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}`;
};
