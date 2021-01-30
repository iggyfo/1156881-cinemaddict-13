import FilmCardView from "../view/film-card";
import DetailsView from "../view/details";
import CommentView from "../view/comment";
import CommentsCountView from "../view/comments-count";
import CommentModel from "../model/comments";
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
    this._commentsComponents = [];
    this._changeData = changeData;
    this._prevDetails = prevDetails;
    this._commentsModel = new CommentModel();
    this._onCommentModelEvent = this._onCommentModelEvent.bind(this);
    this._onCommentViewAction = this._onCommentViewAction.bind(this);

    this._commentsModel.addObserver(this._onCommentModelEvent);
    this.updateDetails = this.updateDetails.bind(this);
    this._renderComments = this._renderComments.bind(this);
    this._onAddWatchedClick = this._onAddWatchedClick.bind(this);
    this._onAddWatchlistClick = this._onAddWatchlistClick.bind(this);
    this._onAddFavoriteClick = this._onAddFavoriteClick.bind(this);
    this._renderDetails = this._renderDetails.bind(this);
    this._onDetailsEscKeydown = this._onDetailsEscKeydown.bind(this);
    this._onFormSubmit = this._onFormSubmit.bind(this);
    this._closeDetails = this._closeDetails.bind(this);
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
    this._commentsCountComponent = new CommentsCountView(this._comments.length);
    render(this._detailsComponent.commentWrap, this._commentsCountComponent, RenderPosition.AFTERBEGIN);
    this._comments.forEach((comment) => {
      const newComment = new CommentView(comment);
      this._commentsComponents.push(newComment);
      render(this._detailsComponent.commentList, newComment, RenderPosition.BEFOREEND);
      newComment.setOnRemoveComment(this._onCommentViewAction);
    });
  }

  _removeComments() {
    this._removeComponent(this._commentsCountComponent);
    this._commentsComponents.forEach((comment) => {
      this._removeComponent(comment);
    });
    this._commentsComponents = [];
    this._comments = [];
  }

  _removeComponent(component) {
    component.getElement().remove();
    component.removeElement();
    component = null;
  }

  _closeDetails() {
    this._detailsComponent.getElement().remove();
    this._detailsComponent.removeElement();
    this._detailsComponent = null;
    document.body.classList.remove(`hide-overflow`);
    document.removeEventListener(`keydown`, this._onDetailsEscKeydown);
  }

  updateDetails(film) {
    if (this._detailsComponent) {
      this._closeDetails();
      this.init(film);
      this._renderDetails();
    }
  }

  _onDetailsEscKeydown(evt) {
    if (evt.key === constants.ESC) {
      this._closeDetails();
    }
  }

  _onAddWatchedClick() {
    this._changeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
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
        UpdateType.PATCH,
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
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              isFavorite: !this._film.isFavorite
            }
        )
    );
  }

  _onCommentViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
        this._api.deleteComments(update)
        .then(() => {
          this._commentsModel.deleteComments(UpdateType.DELETE_COMMENT, update);
        });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(update).then((response) => {
          this._commentsModel.addComments(updateType, response);
        });

    }
  }

  _onCommentModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.DELETE_COMMENT:
        this._removeComments();
        this._api.getComments(this._film.id)
          .then((comments) => {
            this._comments = comments;
          })
          .then(this._renderComments);
        break;
    }
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
