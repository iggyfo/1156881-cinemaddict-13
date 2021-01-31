import CommentListView from "../view/comments-list";
import CommentView from "../view/comment";
import CommentsCountView from "../view/comments-count";
import NewCommentView from "../view/new-comment";
import CommentModel from "../model/comments";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {UserAction, UpdateType, API_CONFIG} from "../const";
import Api from "../api/api";


export default class CommentsListPresenter {
  constructor(container, film) {
    this._container = container;
    this._film = film;
    this._commentListComponent = null;
    this._comments = [];
    this._commentsComponents = [];

    this._onCommentModelEvent = this._onCommentModelEvent.bind(this);
    this._onCommentViewAction = this._onCommentViewAction.bind(this);
    this._renderComments = this._renderComments.bind(this);

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
        this._renderCommentsCount();
        this._renderCommentList();
        this._renderComments();
        this._renderNewComment();
      });
  }

  _renderCommentList() {
    this._commentListComponent = new CommentListView();
    render(this._container, this._commentListComponent, RenderPosition.BEFOREEND);
  }

  _renderComments() {
    this._comments.forEach((comment) => {
      const newComment = new CommentView(comment);
      this._commentsComponents.push(newComment);
      render(this._commentListComponent.getElement(), newComment, RenderPosition.BEFOREEND);
      newComment.setOnRemoveComment(this._onCommentViewAction);
    });
  }

  _renderCommentsCount() {
    this._commentsCountComponent = new CommentsCountView(this._comments.length);
    render(this._container, this._commentsCountComponent, RenderPosition.BEFOREEND);
  }

  _renderNewComment() {
    this._newCommentComponent = new NewCommentView();
    render(this._container, this._newCommentComponent, RenderPosition.BEFOREEND);
    this._newCommentComponent.setOnAddNewComment(this._onCommentViewAction);
  }

  _removeComments() {
    this._removeComponent(this._commentsCountComponent);
    this._commentsComponents.forEach((comment) => {
      this._removeComponent(comment);
    });
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
          this._removeComments();
          this._renderComments();
        });
        break;
      case UserAction.ADD_COMMENT:
        this._api.addComment(update, this._film.id).then((response) => {
          this._commentsModel.setComments(updateType, response.comments);
        });
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
          })
          .then(this._renderComments);
        break;
      case UpdateType.ADD_COMMENT:
        this._removeComments();
        this._comments = this._commentsModel.comments;
        this._renderComments();
        break;
    }
  }
}

