import { createFeatureSelector, createReducer, createSelector, on } from "@ngrx/store";
import * as appAction from "./app.action";
import Movie from "./app.state";

interface AppState{
  globalState: {
    currentState: string,
    pageNumber: number,
  },
  trendingMovies: Movie,
  searchedMovies: Movie,
  movieDetails: any,
  filteredMovies: any,
  error: string
}


const initialState: AppState = {
  globalState: {
    currentState: 'explore',
    pageNumber: 1,
  },
  trendingMovies: {
    page: 0,
    result: [],
    total_pages: 0,
    total_results: 0
  },
  searchedMovies: {
    page: 0,
    result: [],
    total_pages: 0,
    total_results: 0
  },
  filteredMovies: {
    page: 0,
    result: [],
    total_pages: 0,
    total_results: 0,
    filter: ''
  },
  movieDetails: [],
  error: ''
}

const appFeatureSelector = createFeatureSelector<AppState>('app-state');

export const globalStateSelector = createSelector(
  appFeatureSelector,
  (state) => state?.globalState
);

export const trendingMoviesSelector = createSelector(
  appFeatureSelector,
  (state) => state?.trendingMovies
);

export const searchedMovieSelector = createSelector(
  appFeatureSelector,
  (state) => state?.searchedMovies
);

export const movieDetailedSelector = createSelector(
  appFeatureSelector,
  (state) => state?.movieDetails
);

export const filteredMovieSelector = createSelector(
  appFeatureSelector,
  (state) => state?.filteredMovies
);

export const appReducer = createReducer(
  initialState,
  on(appAction.changeGlobalState, (state, action): AppState => {
    return {
      ...state,
      globalState: {
        currentState: action.currentState,
        pageNumber: action.pageNumber
      }
    }
  }),
  on(appAction.fetchTrendingMoviesSuccess, (state, action): AppState => {
    return {
      ...state,
      trendingMovies: action.trendingMovies
    }
  }),
  on(appAction.fetchTrendingMoviesFailure, (state, action): AppState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(appAction.fetchSearchedMoviesSuccess, (state, action): AppState => {
    return {
      ...state,
      searchedMovies: action.searchedMovies
    }
  }),
  on(appAction.fetchSearchedMoviesFailure, (state, action): AppState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(appAction.fetchMovieDetailedInfoSuccess, (state, action): AppState => {
    return {
      ...state,
      movieDetails: action.movieDetails
    }
  }),
  on(appAction.fetchMovieDetailedInfoFailure, (state, action): AppState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(appAction.appendMovieDetailedInfoMediaSuccess, (state, action): AppState => {
    return {
      ...state,
      movieDetails: {...state.movieDetails, 'movieMediaData': action.mediaData}
    }
  }),
  on(appAction.appendMovieDetailedInfoMediaFailure, (state, action): AppState => {
    return {
      ...state,
      error: action.error
    }
  }),
  on(appAction.fetchFilteredMoviesSuccess, (state, action): AppState => {
    return {
      ...state,
      filteredMovies: {...action.filteredMovies, 'filter': action.filter},
    }
  })
)
