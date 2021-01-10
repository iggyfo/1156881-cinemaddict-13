import FilmCard from "../view/film-card";
import Details from "../view/details";
import {render, RenderPosition, remove} from "../utils/render";


export default class Movie {
  constructor(container) {
    this._container = container;
  }

  init(film) {
    this._film = film;
    this._filmCardComponent = new FilmCard(this._film);
    this._renderFilmCard(this._film);
  }

  _renderFilmCard() {
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
    render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
  }
}
