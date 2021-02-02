const constants = {
  ESC: `Escape`,
  ENTER: `Enter`,
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const UserAction = {
  UPDATE_FILM: `UPDATE_FILM`,
  ADD_FILM: `ADD_FILM`,
  DELETE_FILM: `DELETE_FILM`,
  UPDATE_DETAILS: `UPDATE_DETAILS`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  ADD_COMMENT: `ADD_COMMENT`,

};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  UPDATE_DETAILS: `UPDATE_DETAILS`,
  INIT: `INIT`,
  DELETE_COMMENT: `DELETE_COMMENT`,
  ADD_COMMENT: `ADD_COMMENT`,

};

const FilterType = {
  ALL_MOVIES: `All movies`,
  WATCH_LIST: `Watchlist`,
  FAVORITES: `Favorites`,
  HISTORY: `History`,
  WATCHED: `Watched`,
};

const ExstraFilmsList = {
  TOP_RATED: `Top Rated`,
  MOST_COMMENTED: `Most commented`,
};

const API_CONFIG = {
  authorization: `Basic jv1a2n134edwvsns`,
  endPoint: `https://13.ecmascript.pages.academy/cinemaddict`,
};

const MenuItem = {
  FILMS: `films`,
  STATS: `stats`,
};

const RankScore = {
  NOVICE: {
    MIN: 1,
    MAX: 10
  },
  FAN: {
    MIN: 11,
    MAX: 20
  }
};

const RankTitle = {
  NONE: ``,
  NOVICE: `Novice`,
  FAN: `Fan`,
  MOVIE_BUFF: `Movie Buff`
};

const SHAKE_ANIMATION_TIMEOUT = 600;


export {constants, SortType, UserAction, UpdateType, FilterType, ExstraFilmsList, API_CONFIG, MenuItem, RankScore, RankTitle, SHAKE_ANIMATION_TIMEOUT};
