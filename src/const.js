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
  DELETE_FILM: `DELETE_FILM`
};

const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`
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

export {constants, SortType, UserAction, UpdateType, FilterType, ExstraFilmsList};
