import FilmCardView from "../view/film-card";
import DetailsView from "../view/details";
import CommentView from "../view/comment";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {constants} from "../const";
import {UserAction, UpdateType, NetworksList} from "../const";
import Api from "../api/api";


export default class Film {
  constructor(container, changeData, prevDetails) {
    this._container = container;
    this._filmCardComponent = null;
    this._detailsComponent = null;
    this._comments = [];
    this._changeData = changeData;
    this._prevDetails = prevDetails;
    this._onAddWatchedClick = this._onAddWatchedClick.bind(this);
    this._onAddWatchlistClick = this._onAddWatchlistClick.bind(this);
    this._onAddFavoriteClick = this._onAddFavoriteClick.bind(this);
    this._renderDetails = this._renderDetails.bind(this);
    this._onDetailsEscKeydown = this._onDetailsEscKeydown.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._closeDetails = this._closeDetails.bind(this);
    this._onRemoveCommentButtonClick = this._onRemoveCommentButtonClick.bind(this);
  }

  init(film) {
    this._film = film;
    this._api = new Api(NetworksList.END_POINT, NetworksList.AUTHORIZATION);

    this._api.getComments(this._film.id)
      .then((comments) => {
        this._comments = comments;
      });
    const prevFilmComponent = this._filmCardComponent;
    this._filmCardComponent = new FilmCardView(this._film);
    this._filmCardComponent.setOnAddWachedClick(this._onAddWatchedClick);
    this._filmCardComponent.setOnAddWatchlistClick(this._onAddWatchlistClick);
    this._filmCardComponent.setOnAddFavoriteClick(this._onAddFavoriteClick);
    this._filmCardComponent.setClickHandler(this._renderDetails);
    if (prevFilmComponent === null) {
      render(this._container, this._filmCardComponent, RenderPosition.BEFOREEND);
      return;
    } else {
      replace(this._filmCardComponent, prevFilmComponent);
    }
    if (this._detailsComponent) {
      this._renderDetails();
    }
    remove(prevFilmComponent);
  }

  _renderDetails() {
    this._prevDetails();
    const prevDetailsComponent = this._detailsComponent;
    this._detailsComponent = new DetailsView(this._film);
    this._detailsComponent.setOnDetailsAddWatchedClick(this._onAddWatchedClick);
    this._detailsComponent.setOnDetailsAddWatchlistClick(this._onAddWatchlistClick);
    this._detailsComponent.setOnDetailsAddFavoriteClick(this._onAddFavoriteClick);
    this._detailsComponent.setOnFormSubmit(this._onFormSubmit);
    this._detailsComponent.setOnCloseBtn(this._closeDetails);
    document.addEventListener(`keydown`, this._onDetailsEscKeydown);
    this._renderComments();

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

  _renderComments() {
    this._film.comments.forEach((comment) => {
      const newComment = new CommentView(comment);
      this._comments.push(newComment);
      render(this._detailsComponent.commentList, newComment, RenderPosition.BEFOREEND);
      newComment.setOnRemoveComment(this._onRemoveCommentButtonClick);
    });
  }

  _closeDetails() {
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

  _onAddWatchedClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
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
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _onRemoveCommentButtonClick(removedComment) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              comments: this._film.comments.filter((comment) => comment.id !== removedComment.id)
            }
        )
    );
  }

  _onFormSubmit(film) {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.MINOR,
        film
    );
    this._closeDetails();
  }

  destroy() {
    remove(this._filmCardComponent);
  }
}
