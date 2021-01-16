import FilmCard from "../view/film-card";
import Details from "../view/details";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {constants} from "../utils/constants.js";

export default class Movie {
  constructor(container, changeData) {
    this._container = container;
    this._filmCardComponent = null;
    this._changeData = changeData;
    this._onAddWatchedClick = this._onAddWatchedClick.bind(this);
    this._onAddWatchlistClick = this._onAddWatchlistClick.bind(this);
    this._onAddFavoriteClick = this._onAddFavoriteClick.bind(this);

  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCard(this._film);
    this._filmCardComponent.setOnAddWachedClick(this._onAddWatchedClick);
    this._filmCardComponent.setOnAddWatchlistClick(this._onAddWatchlistClick);
    this._filmCardComponent.setOnAddFavoriteClick(this._onAddFavoriteClick);


    const showDetails = () => {
      const detailsComponent = null;
      const prevFilmComponent = detailsComponent;
      detailsComponent = new Details(this._film);

      detailsComponent.setOnDetailsAddWachedClick(this._onAddWatchedClick);
      detailsComponent.setOnDetailsAddWatchlistClick(this._onAddWatchlistClick);
      detailsComponent.setOnDetailsAddFavoriteClick(this._onAddFavoriteClick);

      document.body.appendChild(detailsComponent.getElement());
      document.body.classList.add(`hide-overflow`);

      const closeDetails = () => {
        detailsComponent.getElement().remove();
        detailsComponent.removeElement();
        document.body.classList.remove(`hide-overflow`);
        document.removeEventListener(`keydown`, onDetailsEscKeydown);
      };

      detailsComponent.closeBtnElement.addEventListener(`click`, () => {
        closeDetails();
      });

      const onDetailsEscKeydown = (evt) => {
        if (evt.key === constants.ESC) {
          closeDetails();
        }
      };

      document.addEventListener(`keydown`, onDetailsEscKeydown);
    };
    this._filmCardComponent.setClickHandler(showDetails);

    if (prevFilmComponent === null) {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    } else {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _onAddWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatched: !this._film.isWatched
            }
        )
    );
  }

  _onAddWatchlistClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isWatchlist: !this._film.isWatchlist
            }
        )
    );
  }

  _onAddFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }
}
