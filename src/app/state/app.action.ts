import { createAction, props } from "@ngrx/store";
import Movie from "./app.state";

export const fetchTrendingMovies = createAction(
  '[Trending Movies] Send Request to Fetch Movies',
);

export const fetchTrendingMoviesSuccess = createAction(
  '[Trending Movies] Response Success for Fetching Trending Movies',
  props<{trendingMovies: Movie}>()
);

export const fetchTrendingMoviesFailure = createAction(
  '[Trending Movies] Response Failure for Fetching Trending Movies',
  props<{error: string}>()
);

export const fetchMovieDetailedInfo = createAction(
  '[Detailed Movie Info] Send Request to Fetch Movie Info',
  props<{movieId: string}>()
);

export const fetchMovieDetailedInfoSuccess = createAction(
  '[Detailed Movie Info] Response Success for Fetching Movie Info',
  props<{movieDetails: any}>()
);

export const fetchMovieDetailedInfoFailure = createAction(
  '[Detailed Movie Info] Response Failure for Fetching Movie Info',
  props<{error: string}>()
);

export const appendMovieDetailedInfoMedia = createAction(
  '[Detailed Movie Info] Send Request to Append Media Data Into Movie Info',
  props<{movieId:string}>()
);

export const appendMovieDetailedInfoMediaSuccess = createAction(
  '[Detailed Movie Info] Response Success For Appending Media Data Into Movie Info',
  props<{mediaData:any}>()
);

export const appendMovieDetailedInfoMediaFailure = createAction(
  '[Detailed Movie Info] Response Failure For Appending Media Data Into Movie Info',
  props<{error:string}>()
);

export const fetchSearchedMovies = createAction(
  '[Searched Movies] Send Request for Fetching Searched Movies',
  props<{movieName: string}>()
);

export const fetchSearchedMoviesSuccess = createAction(
  '[Searched Movies] Response Success for Fetching Searched Movies',
  props<{searchedMovies: Movie}>()
);

export const fetchSearchedMoviesFailure = createAction(
  '[Searched Movies] Response Failure for Fetching Searched Movies',
  props<{error: string}>()
);

export const changeGlobalState = createAction(
  '[Main State] Update the Main state',
  props<{currentState: string, pageNumber: number}>()
);

export const fetchMovieFromID = createAction(
  '[Single Movie] Send Request to Fetch Single Movie from ID',
  props<{movieId: string}>()
);


export const fetchFilteredMovies = createAction(
  '[Filtered Movies] Send Request to Fetch Filtered Movies',
  props<{filter: string}>()
);

export const fetchFilteredMoviesSuccess = createAction(
  '[Filtered Movies] Response Success for Fetching Filtered Movies',
  props<{filteredMovies: Movie, filter: string}>()
);

export const fetchFilteredMoviesFailure = createAction(
  '[Filtered Movies] Response Failure for Fetching Filtered Movies',
  props<{error: string}>()
);
