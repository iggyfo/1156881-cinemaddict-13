const constants = {
  ESC: `Escape`,
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
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  UPDATE_DETAILS: `UPDATE_DETAILS`,
  INIT: `INIT`,
  DELETE_COMMENT: `DELETE_COMMENT`,

};

const FilterType = {
  ALL_MOVIES: `All movies`,
  WATCH_LIST: `Watchlist`,
  FAVORITES: `Favorites`,
  HISTORY: `History`,
};

const ExstraFilmsList = {
  TOP_RATED: `Top Rated`,
  MOST_COMMENTED: `Most commented`,
};

const API_CONFIG = {
  authorization: `Basic jv12n134edwvsns`,
  endPoint: `https://13.ecmascript.pages.academy/cinemaddict`,
};

export {constants, SortType, UserAction, UpdateType, FilterType, ExstraFilmsList, API_CONFIG};
