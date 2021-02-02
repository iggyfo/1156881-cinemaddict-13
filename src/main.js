import FilmsPresenter from "./presenter/films-list-presenter";
import FilterPresenter from "./presenter/filters-presenter";
import FooterStatisticsView from "./view/footer-statistics-view";
import UserRankView from "./view/user-rank-view";
import MenuView from "./view/menu-view";
import StatisticsView from "./view/statistics-view";
import FilmModel from "./model/films-model";
import FilterModel from "./model/filters-model";
import {render, RenderPosition} from "./utils/render";
import {UpdateType, API_CONFIG, MenuItem} from "./const";
import Api from "./api/api";

const api = new Api(API_CONFIG.endPoint, API_CONFIG.authorization);

const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
const userRankComponent = new UserRankView();
const menuComponent = new MenuView();
const filtersModel = new FilterModel();
const filmModel = new FilmModel();

render(headerElement, userRankComponent, RenderPosition.BEFOREEND);
render(mainElement, menuComponent, RenderPosition.AFTERBEGIN);

const statisticComponent = new StatisticsView(filmModel);
render(mainElement, statisticComponent, RenderPosition.BEFOREEND);
statisticComponent.hide();

menuComponent.setOnChangeMenu((menuItem) => {
  switch (menuItem) {
    case MenuItem.FILMS:
      statisticComponent.hide();
      filmsPresenter.show();
      break;

    case MenuItem.STATS:
      filmsPresenter.hide();
      statisticComponent.updateElement();
      statisticComponent.show();
      break;
  }
});

api.getFilms()
  .then((films) => {
    filmModel.setFilms(UpdateType.INIT, films);
    render(footerStatisticsElement, new FooterStatisticsView(filmModel.films.length), RenderPosition.BEFOREEND);
  })
  .catch(() => {
    filmModel.setFilms(UpdateType.INIT, []);
    render(footerStatisticsElement, new FooterStatisticsView(filmModel.films.length), RenderPosition.BEFOREEND);
  });

const filtersPresenter = new FilterPresenter(menuComponent, filtersModel, filmModel);
filtersPresenter.init();
const filmsPresenter = new FilmsPresenter(mainElement, filmModel, filtersModel, api, userRankComponent);
filmsPresenter.init();
