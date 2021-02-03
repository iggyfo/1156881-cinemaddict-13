import CommentListView from "../view/comments-list-view";
import CommentView from "../view/comment-view";
import CommentsCountView from "../view/comments-count-view";
import NewCommentView from "../view/new-comment-view";
import CommentModel from "../model/comments-model";
import {render, RenderPosition} from "../utils/render";
import {UserAction, UpdateType, API_CONFIG, SHAKE_ANIMATION_TIMEOUT} from "../const";
import Api from "../api/api";


export default class CommentsListPresenter {
  constructor(container, film, filmsPresenterChangeData) {
    this._container = container;
    this._film = film;
    this._filmsPresenterChangeData = filmsPresenterChangeData;
    this._commentContainerComponent = null;
    this._comments = [];
    this._commentsComponents = [];

    this._onCommentModelEvent = this._onCommentModelEvent.bind(this);
    this._onCommentViewAction = this._onCommentViewAction.bind(this);
    this._renderCommentsList = this._renderCommentsList.bind(this);

    this._api = new Api(API_CONFIG.endPoint, API_CONFIG.authorization);

    this._commentsModel = new CommentModel();
    this._commentsModel.addObserver(this._onCommentModelEvent);
  }

  init() {
    this._api.getComments(this._film.id)
      .then((response) => {
        this._comments = response;
      })
      .then(() => {
        this._renderComments();
      });
  }

  _renderComments() {
    this._renderCommentsListCount();
    this._renderContainerComponent();
    this._renderCommentsList();
    this._renderNewComment();
  }

  _renderContainerComponent() {
    this._commentContainerComponent = new CommentListView();
    render(this._container, this._commentContainerComponent, RenderPosition.BEFOREEND);
  }

  _renderCommentsList() {
    this._comments.forEach((comment) => {
      const newComment = new CommentView(comment);
      this._commentsComponents.push(newComment);
      render(this._commentContainerComponent.getElement(), newComment, RenderPosition.BEFOREEND);
      newComment.setOnRemoveComment(this._onCommentViewAction);
    });
  }

  _renderCommentsListCount() {
    this._commentsCountComponent = new CommentsCountView(this._comments.length);
    render(this._container, this._commentsCountComponent, RenderPosition.BEFOREEND);
  }

  _renderNewComment() {
    this._newCommentComponent = new NewCommentView();
    render(this._container, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setOnAddNewComment(this._onCommentViewAction);
  }

  _removeComments() {
    this._removeComponent(this._commentContainerComponent);
    this._removeComponent(this._commentsCountComponent);
    this._commentsComponents.forEach((comment) => {
      this._removeComponent(comment);
    });
    this._removeComponent(this._newCommentComponent);
    this._commentsComponents = [];
  }

  _removeComponent(component) {
    component.getElement().remove();
    component.removeElement();
    component = null;
  }

  _onCommentViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.DELETE_COMMENT:
        const commentComponent = this._commentsComponents.filter((comment) => comment._comment.id === update.id);
        this._api.deleteComments(update)
        .then(() => {
          this._comments = this._comments.filter((comment) => update !== comment);
          this._commentsModel.setAll(updateType, this._comments);
          this._onNumCommentsChanged();
        })
        .catch(() => {
          this._shake(commentComponent[0].getElement());
          commentComponent[0].getElement().querySelector(`.film-details__comment-delete`).textContent = `Delete`;
          commentComponent[0].getElement().querySelector(`.film-details__comment-delete`).disabled = false;
        });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(update, this._film.id)
          .then((response) => {
            this._commentsModel.setAll(updateType, response.comments);
          })
          .catch(() => {
            this._shake(this._newCommentComponent.getElement());
            this._newCommentComponent.getElement()
              .querySelector(`.film-details__comment-input`)
              .disabled = false;
          });
        this._onNumCommentsChanged();
        break;
    }
  }

  _onCommentModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.DELETE_COMMENT:
        this._removeComments();
        this._renderComments();
        break;
      case UpdateType.ADD_COMMENT:
        this._removeComments();
        this._comments = this._commentsModel.getAll();
        this._renderComments();
        break;
    }
  }

  _onNumCommentsChanged() {
    this._filmsPresenterChangeData(
        UserAction.UPDATE_FILM,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._film,
            {
              comments: this._comments.map((comment) => comment.id)
            }
        )
    );
  }

  _shake(element) {
    element.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;
    setTimeout(() => {
      element.style.animation = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

