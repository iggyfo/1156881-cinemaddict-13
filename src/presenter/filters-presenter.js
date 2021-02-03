import FilterView from "../view/filter-view";
import {render, RenderPosition, replace, remove} from "../utils/render";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType} from "../const.js";


export default class FilterPresenter {
  constructor(filterContainer, filterModel, filmsModel) {
    this._filterContainer = filterContainer;
    this._filterModel = filterModel;
    this._filmsModel = filmsModel;
    this._currentFilter = null;
    this._filterComponent = null;

    this._onModelEvent = this._onModelEvent.bind(this);
    this._onFilterTypeChange = this._onFilterTypeChange.bind(this);

    this._filmsModel.addObserver(this._onModelEvent);
    this._filterModel.addObserver(this._onModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getAll();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setOnFilterTypeChange(this._onFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this._filterContainer, this._filterComponent, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  }

  _onModelEvent() {
    this.init();
  }

  _onFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setAll(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const films = this._filmsModel.getAll();

    return {
      allMovies: filter[FilterType.ALL_MOVIES](films).length,
      watchlist: filter[FilterType.WATCH_LIST](films).length,
      favorites: filter[FilterType.FAVORITES](films).length,
      history: filter[FilterType.HISTORY](films).length
    };
  }
}
