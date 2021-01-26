import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";


dayjs.extend(duration);

export const parseToMinAndHours = (minutes) => {
  const durationInMin = dayjs.duration(minutes, `m`);
  const hoursStr = durationInMin.hours() > 0 ? durationInMin.format(`H[h] `) : ``;
  const minutesStr = durationInMin.format(`m[m]`);
  return `${hoursStr}${minutesStr}`;
};

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
