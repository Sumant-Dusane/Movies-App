import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NetworkService } from "../services/Apis/network.service"
import * as appAction from "./app.action";
import { catchError, filter, map, mergeMap, of, withLatestFrom } from "rxjs";
import { Store, select } from "@ngrx/store";
import { filteredMovieSelector, globalStateSelector, searchedMovieSelector, trendingMoviesSelector } from "./app.reducer";

@Injectable()
export class AppEffect {
  constructor (private action$: Actions, private networkService: NetworkService, private store: Store) { }

  getTrendingMovie$ = createEffect(() => {
    return this.action$.pipe(
      ofType(appAction.fetchTrendingMovies),
      withLatestFrom(
        this.store.pipe(select(trendingMoviesSelector)),
        this.store.pipe(select(globalStateSelector))
      ),
      filter(([action, trendingMovies, globalState]) => trendingMovies?.total_results == 0 || trendingMovies?.page != globalState?.pageNumber),
      mergeMap(() => this.networkService.getTrendingMovies().pipe(
        map(
          (trendingMovies) => appAction.fetchTrendingMoviesSuccess({trendingMovies}),
          catchError((error) => of(appAction.fetchTrendingMoviesFailure({error})))
        )
      ))
    );
  });
  getSearchedMovie$ = createEffect(() => {
    return this.action$.pipe(
      ofType(appAction.fetchSearchedMovies),
      withLatestFrom(
        this.store.pipe(select(searchedMovieSelector)),
        this.store.pipe(select(globalStateSelector))
      ),
      filter(([action, searchedMovies, globalState]) => searchedMovies?.total_results == 0 || searchedMovies?.page != globalState?.pageNumber),
      mergeMap(([{movieName}]) => this.networkService.getDatafromSearch(movieName).pipe(
        map(
          (searchedMovies) => appAction.fetchSearchedMoviesSuccess({searchedMovies}),
          catchError((error) => of(appAction.fetchSearchedMoviesFailure({error})))
        )
      ))
    );
  });
  getMovieDetailedInfo = createEffect(() => {
    return this.action$.pipe(
      ofType(appAction.fetchMovieDetailedInfo),
      mergeMap(({movieId}) => this.networkService.getDatafromID(movieId).pipe(
        map(
          (movieDetails) => appAction.fetchMovieDetailedInfoSuccess({movieDetails}),
          catchError((error) => of(appAction.fetchMovieDetailedInfoFailure({error})))
        )
      )),
    );
  });
  appendMovieDetailedMediaInfo = createEffect(() => {
    return this.action$.pipe(
      ofType(appAction.appendMovieDetailedInfoMedia),
      mergeMap(({movieId}) => this.networkService.getDataMedia(movieId).pipe(
        map(
          (mediaData) => appAction.appendMovieDetailedInfoMediaSuccess({mediaData}),
          catchError((error) => of(appAction.appendMovieDetailedInfoMediaFailure({error})))
        )
      )),
    );
  });
  getFilteredMovies = createEffect(() => {
    return this.action$.pipe(
      ofType(appAction.fetchFilteredMovies),
      withLatestFrom(
        this.store.pipe(select(filteredMovieSelector)),
        this.store.pipe(select(globalStateSelector))
      ),
      filter(([action, filteredMovies, globalState]) => filteredMovies?.total_results == 0 || filteredMovies?.page != globalState?.pageNumber || filteredMovies?.filter != filter),
      mergeMap(([{filter}]) => this.networkService.getDataFromFilters(filter).pipe(
        map(
          (filteredMovies) => appAction.fetchFilteredMoviesSuccess({filteredMovies, filter}),
          catchError((error) => of(appAction.fetchFilteredMoviesFailure({error})))
        )
      )),
    );
  });
}
