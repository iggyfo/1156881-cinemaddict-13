import MenuView from "./view/menu";
import FilmsListPresenter from "./presenter/films-list";
import FooterStatisticsView from "./view/footer-statistics";
import FilmModel from "./model/films";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";


const NUM_OF_FILMS = 20;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
let films = [];
const filters = generateFilter(films);

for (let i = 0; i < NUM_OF_FILMS; i++) {
  films.push(generateFilm());
}
render(headerElement, new MenuView(), RenderPosition.BEFOREEND);

const filmModel = new FilmModel();
filmModel.films = films;

const movieList = new FilmsListPresenter(mainElement, filmModel, filters);
movieList.init(films);

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterStatisticsView(films.length), RenderPosition.BEFOREEND);
