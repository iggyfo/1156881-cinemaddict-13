import Menu from "./view/menu";
import Filter from "./view/filter";
import Sort from "./view/sort";
import FilmsContainer from "./view/films-container";
import MovieList from "./presenter/movieList";
import FooterStatistics from "./view/footer-statistics";
import {generateFilm} from "./mock/film";
import {generateFilter} from "./mock/filter";
import {render, RenderPosition} from "./utils/render";


const NUM_OF_FILMS = 24;
const headerElement = document.querySelector(`.header`);
const mainElement = document.querySelector(`.main`);
const footerElement = document.querySelector(`.footer`);
let films = [];

for (let i = 0; i < NUM_OF_FILMS; i++) {
  films.push(generateFilm());
}
render(headerElement, new Menu(), RenderPosition.BEFOREEND);
render(mainElement, new Filter(generateFilter(films)), RenderPosition.BEFOREEND);
render(mainElement, new Sort(), RenderPosition.BEFOREEND);
render(mainElement, new FilmsContainer(), RenderPosition.BEFOREEND);
const filmsElement = mainElement.querySelector(`.films`);

const movieList = new MovieList(filmsElement);
movieList.init(films);

const footerStatisticsElement = footerElement.querySelector(`.footer__statistics`);
render(footerStatisticsElement, new FooterStatistics(films.length), RenderPosition.BEFOREEND);
