import DetailsView from "../view/details";
import DetailsControlsView from "../view/details-controls";
import CommentListPresenter from "../presenter/comments-list";

import {render, RenderPosition, replace, remove} from "../utils/render";
import {constants} from "../const";
import {UserAction, UpdateType} from "../const";


export default class Details {
  constructor(film, changeData, onDetailsClose) {
    this._container = document.body;
    this._film = film;
    this._changeData = changeData;
    this._detailsComponent = null;
    this._commentListPresenter = null;
    this._onDetailsClose = onDetailsClose;

    this._onDetailsControlsClick = this._onDetailsControlsClick.bind(this);
    this._onDetailsEscKeydown = this._onDetailsEscKeydown.bind(this);
    this._closeDetails = this._closeDetails.bind(this);
  }

  init() {
    const prevDetailsComponent = this._detailsComponent;
    this._detailsComponent = new DetailsView(this._film);
    this._renderDetailsControls();
    this._commentListPresenter = new CommentListPresenter(this._detailsComponent.commentWrap, this._film);
    this._commentListPresenter.init();
    this._detailsComponent.setOnCloseBtn(this._closeDetails);
    document.addEventListener(`keydown`, this._onDetailsEscKeydown);

    if (this._detailsComponent) {
      document.body.appendChild(this._detailsComponent.getElement());
      document.body.classList.add(`hide-overflow`);
    } else {
      replace(this._detailsComponent, prevDetailsComponent);
    }
    if (prevDetailsComponent) {
      remove(prevDetailsComponent);
    }
  }

  _renderDetailsControls() {
    this._detailsControlsComponent = new DetailsControlsView(this._film);
    this._detailsControlsComponent.setOnDetailsControlsClick(this._onDetailsControlsClick);
    render(this._detailsComponent.controlsElement, this._detailsControlsComponent, RenderPosition.BEFOREEND);
  }

  _closeDetails() {
    this._onDetailsClose();
    this._detailsComponent.getElement().remove();
    this._detailsComponent.removeElement();
    this._detailsComponent = null;
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._onDetailsEscKeydown);
  }

  _onDetailsEscKeydown(evt) {
    if (evt.key === constants.ESC) {
      this._closeDetails();
    }
  }

  _onDetailsControlsClick(film) {
    this._film = film;
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign({}, this._film)
    );
  }

  destroy() {
    remove(this._detailsComponent);
  }
}
