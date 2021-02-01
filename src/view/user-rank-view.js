import Smart from "./smart-view";
import {getUserRank} from "../utils/common";


export default class UserRankView extends Smart {
  constructor() {
    super();
    this._userRank = ``;
  }

  getTemplate() {
    return `<section class="header__profile profile">
      <p class="profile__rating">${this._userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`;
  }

  setRank(films) {
    this._userRank = getUserRank(films);
    this.updateElement();
  }

  restoreHandlers() {}
}
