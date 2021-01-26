import MenuView from "./view/menu";
import FilmsListPresenter from "./presenter/films-list";
import FilterPresenter from "./presenter/filters";
import FooterStatisticsView from "./view/footer-statistics";
import FilmModel from "./model/films";
import FilterModel from "./model/filters";
import {render, RenderPosition} from "./utils/render";
import {UpdateType, NetworksList} from "./const";
import Api from "./api/api";


const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);


const api = new Api(NetworksList.END_POINT, NetworksList.AUTHORIZATION);

render(headerElement, new MenuView(), RenderPosition.BEFOREEND);

const filtersModel = new FilterModel();
const filmModel = new FilmModel();

api.getFilms()
  .then((films) => {
    filmModel.setFilms(UpdateType.INIT, films);
  })
  .catch(() => {
    filmModel.setFilms(UpdateType.INIT, []);
  });

// presenters
const filtersPresenter = new FilterPresenter(mainElement, filtersModel, filmModel);
filtersPresenter.init();
const filmsList = new FilmsListPresenter(mainElement, filmModel, filtersModel, api);
filmsList.init();

// footer
const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
// render(footerStatisticsElement, new FooterStatisticsView(filmModel.getFilms.length), RenderPosition.BEFOREEND);


