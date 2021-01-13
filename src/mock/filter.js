export const generateFilter = (films) => {
  const filmsFilter = {
    allMovies: films.length,
    watchlist: 0,
    favorites: 0,
    history: 0
  };

  films.forEach((film) => {
    if (film.isWatchlist) {
      filmsFilter.watchlist++;
    }
    if (film.isWatched) {
      filmsFilter.favorites++;
    }
    if (film.isFavorite) {
      filmsFilter.history++;
    }
  });
  return filmsFilter;
};
