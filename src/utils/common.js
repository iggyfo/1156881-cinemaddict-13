import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import {RankScore, RankTitle} from "../const";


dayjs.extend(duration);

export const parseToMinAndHours = (minutes) => {
  const durationInMin = dayjs.duration(minutes, `m`);
  const hoursStr = durationInMin.hours() > 0 ? durationInMin.format(`H[h] `) : ``;
  const minutesStr = durationInMin.format(`m[m]`);
  return `${hoursStr}${minutesStr}`;
};

export const getUserRank = (films) => {
  const totalWatch = films.reduce((count, film) => count + Number(film.isWatched), 0);

  if (totalWatch >= RankScore.NOVICE.MIN && totalWatch <= RankScore.NOVICE.MAX) {
    return RankTitle.NOVICE;
  } else if (totalWatch >= RankScore.FAN.MIN && totalWatch <= RankScore.FAN.MAX) {
    return RankTitle.FAN;
  } else if (totalWatch > RankScore.FAN.MAX) {
    return RankTitle.MOVIE_BUFF;
  } else {
    return RankTitle.NONE;
  }
};

