import FilmCard from "../view/film-card";
import Details from "../view/details";
import {render, RenderPosition, replace, remove} from "../utils/render";


export default class Movie {
  constructor(container, changeData) {
    this._container = container;
    this._filmCardComponent = null;
    this._changeData = changeData;
  }

  init(film) {
    this._film = film;
    const prevFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCard(this._film);
    this._filmCardComponent.setOnAddWachedClick(this._onAddWachedClick);
    // this._filmCardComponent.setArchiveClickHandler(this._onAddWachlistClick);
    // this._filmCardComponent.setArchiveClickHandler(this._onAddFavoriteClick);


    const showDetails = () => {
      const detailsComponent = new Details(this._film);
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
        if (evt.key === `Escape`) {
          closeDetails();
        }
      };

      document.addEventListener(`keydown`, onDetailsEscKeydown);
    };
    this._filmCardComponent.setClickHandler(showDetails);

    if (prevFilmComponent === null) {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._container.getElement().contains(prevFilmComponent.getElement())) {
      replace(this._filmCardComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
  }

  destroy() {
    remove(this._filmCardComponent);
  }

  _onAddWachedClick() {
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
}
