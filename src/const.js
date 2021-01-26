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
  UPDATE_DETAILS: `UPDATE_DETAILS`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  UPDATE_DETAILS: `UPDATE_DETAILS`,
  INIT: `INIT`
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

const NetworksList = {
  AUTHORIZATION: `Basic jv12n134edvsns`,
  END_POINT: `https://13.ecmascript.pages.academy/cinemaddict/`,
};

export {constants, SortType, UserAction, UpdateType, FilterType, ExstraFilmsList, NetworksList};
