export const timeToString = (time: number): string => {
  const getSeconds = `0${time % 60}`.slice(-2);
  const minutes = `${Math.floor(time / 60)}`;
  const getMinutes = `0${parseInt(minutes) % 60}`.slice(-2);
  const getHours = `0${Math.floor(time / 3600)}`.slice(-2);
  return `${getHours}:${getMinutes}:${getSeconds}`;
};

export const timeToShortString = (time: number): string => {
  const hours = Math.floor(time / 3600); // 시간 계산
  const minutes = Math.floor((time % 3600) / 60); // 분 계산

  // `{hours}h {minutes}min` 형식으로 반환
  return `${hours}h ${minutes}min`;
};
