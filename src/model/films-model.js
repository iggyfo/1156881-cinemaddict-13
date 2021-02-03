import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  setAll(updateType, films) {
    this._films = films.slice();
    this.notify(updateType);
  }

  getAll() {
    return this._films;
  }

  updateAll(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      update,
      ...this._films.slice(index + 1)
    ];

    this.notify(updateType, update);
  }

  addAll(updateType, update) {
    this._films = [
      update,
      ...this._films
    ];

    this.notify(updateType, update);
  }

  deleteAll(updateType, update) {
    const index = this._films.findIndex((film) => film.id === update.id);

    if (index === -1) {
      throw new Error(`Can't delete unexisting film`);
    }

    this._films = [
      ...this._films.slice(0, index),
      ...this._films.slice(index + 1)
    ];

    this.notify(updateType);
  }

  static adaptToClient(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          poster: film.film_info.poster,
          title: film.film_info.title,
          originalTitle: film.film_info.alternative_title,
          rating: film.film_info.total_rating,
          producer: film.film_info.director,
          screenwriters: film.film_info.writers,
          cast: film.film_info.actors,
          release: {
            date: film.film_info.release.date,
            releaseCountry: film.film_info.release.release_country,
          },
          runtime: film.film_info.runtime,
          genres: film.film_info.genre,
          description: film.film_info.description,
          ageRating: film.film_info.age_rating,
          isWatchlist: film.user_details.watchlist,
          isWatched: film.user_details.already_watched,
          watchedDate: film.user_details.watching_date,
          isFavorite: film.user_details.favorite,
        }
    );

    delete adaptedFilm.film_info;
    delete adaptedFilm.user_details;

    return adaptedFilm;
  }

  static adaptToServer(film) {
    const adaptedFilm = Object.assign(
        {},
        film,
        {
          "id": film.id,
          "comments": film.comments,
          "film_info": {
            "title": film.title,
            "alternative_title": film.originalTitle,
            "total_rating": film.rating,
            "poster": film.poster,
            "age_rating": film.ageRating,
            "director": film.producer,
            "writers": film.screenwriters,
            "actors": film.cast,
            "release": {
              "date": film.release.date,
              "release_country": film.release.releaseCountry,
            },
            "runtime": film.runtime,
            "genre": film.genres,
            "description": film.description,
          },
          "user_details": {
            "watchlist": film.isWatchlist,
            "already_watched": film.isWatched,
            "watching_date": film.watchedDate,
            "favorite": film.isFavorite,
          }
        }
    );

    delete film.id;
    delete film.comments;
    delete film.title;
    delete film.originalTitle;
    delete film.rating;
    delete film.poster;
    delete film.ageRating;
    delete film.producer;
    delete film.screenwriters;
    delete film.cast;
    delete film.release;
    delete film.runtime;
    delete film.genres;
    delete film.description;
    delete film.isWatchlist;
    delete film.isWatched;
    delete film.watchedDate;
    delete film.isFavorite;

    return adaptedFilm;
  }
}
