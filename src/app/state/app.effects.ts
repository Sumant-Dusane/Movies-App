import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { NetworkService } from "../services/Apis/network.service"
import * as appAction from "./app.action";
import { catchError, map, mergeMap, of } from "rxjs";

@Injectable()
export class AppEffect {
  constructor (private action$: Actions, private networkService: NetworkService) { }

  getTrendingMovie$ = createEffect(() => {
    return this.action$.pipe(
      ofType(appAction.fetchTrendingMovies),
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
      mergeMap(({movieName}) => this.networkService.getDatafromSearch(movieName).pipe(
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
}
