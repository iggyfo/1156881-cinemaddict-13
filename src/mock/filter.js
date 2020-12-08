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
    } else if (film.isFavorites) {
      filmsFilter.favorites++;
    } else if (film.isHistory) {
      filmsFilter.history++;
    }
  });
  return filmsFilter;
};
