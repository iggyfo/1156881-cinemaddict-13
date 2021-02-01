import CommentListView from "../view/comments-list";
import CommentView from "../view/comment";
import CommentsCountView from "../view/comments-count";
import NewCommentView from "../view/new-comment";
import CommentModel from "../model/comments";
import {render, RenderPosition} from "../utils/render";
import {UserAction, UpdateType, API_CONFIG} from "../const";
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
        this._api.deleteComments(update)
        .then(() => {
          this._comments = this._comments.filter((comment) => update !== comment);
          this._commentsModel.setComments(updateType, this._comments);
          this._onNumCommentsChanged();
        });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(update, this._film.id).then((response) => {
          this._commentsModel.setComments(updateType, response.comments);
        });
        this._onNumCommentsChanged();
        break;
    }
  }

  _onCommentModelEvent(updateType) {
    switch (updateType) {
      case UpdateType.DELETE_COMMENT:
        this._removeComments();
        this._api.getComments(this._film.id)
          .then((comments) => {
            this._comments = comments;
            this._renderComments();
          });
        break;
      case UpdateType.ADD_COMMENT:
        this._removeComments();
        this._comments = this._commentsModel.comments;
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
}

