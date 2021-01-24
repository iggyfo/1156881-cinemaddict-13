import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL_MOVIES]: (films) => films.filter((film) => film),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.isFavorite),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.isWatched),
  [FilterType.WATCH_LIST]: (films) => films.filter((film) => film.isWatchlist)
};
