import Observer from "../utils/observer.js";

export default class Films extends Observer {
  constructor() {
    super();
    this._films = [];
  }

  set films(films) {
    this._films = films.slice();
  }

  get films() {
    return this._films;
  }

  updateFilm(updateType, update) {
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

  addFilm(updateType, update) {
    this._films = [
      update,
      ...this._films
    ];

    this.notify(updateType, update);
  }

  deleteFilm(updateType, update) {
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
          // "due_date": task.dueDate instanceof Date ? task.dueDate.toISOString() : null, // На сервере дата хранится в ISO формате
          // "is_archived": task.isArchive,
          // "is_favorite": task.isFavorite,
          // "repeating_days": task.repeating
        }
    );

    // // Ненужные ключи мы удаляем
    // delete adaptedTask.dueDate;
    // delete adaptedTask.isArchive;
    // delete adaptedTask.isFavorite;
    // delete adaptedTask.repeating;

    return adaptedFilm;
  }
}
