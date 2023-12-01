import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { changeGlobalState, fetchFilteredMovies, fetchSearchedMovies, fetchTrendingMovies } from 'src/app/state/app.action';
import { filteredMovieSelector, globalStateSelector, searchedMovieSelector, trendingMoviesSelector } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isSkeleton: boolean = true;
  searchData: any;
  currentState: any;
  maxPages: number;

  constructor(private route: ActivatedRoute, private store: Store) {

  }

  ngOnInit() {
    let queryParams = '';
    let urlParams = '';

    this.route.queryParams.subscribe(qparams => {
      queryParams = qparams['filter'];
      if (queryParams) {
        this.handleStates('', queryParams);
      }
    });

    this.route.params.subscribe(params => {
      urlParams = params['title'];
      if (urlParams) {
        this.handleStates(urlParams, '');
      }
    });

    if (!urlParams && !queryParams) {
      this.handleStates('', '');
    }

    this.store.select(globalStateSelector).subscribe(state => {
      this.currentState = state;

      if (this.currentState?.currentState == 'explore') {
        this.getTrendingMovies(this.currentState?.pageNumber);
      }
      if (this.currentState?.currentState == 'searched') {
        this.getDataFromSearch(urlParams, this.currentState?.pageNumber);
      }
      if (this.currentState?.currentState == 'filtered') {
        this.getDataFromFilter(queryParams, this.currentState?.pageNumber);
      }
    });
  }

  handleStates(urlParams: any, queryParams: any) {
    if (urlParams) {
      this.store.dispatch(changeGlobalState({ currentState: 'searched', pageNumber: this.currentState?.pageNumber || 1 }))
    } else if (queryParams) {
      this.store.dispatch(changeGlobalState({ currentState: 'filtered', pageNumber: this.currentState?.pageNumber || 1 }))
    } else {
      this.store.dispatch(changeGlobalState({ currentState: 'explore', pageNumber: this.currentState?.pageNumber || 1 }))
    }
    this.isSkeleton = true;
  }

  getDataFromSearch(searchParam: string, pageNumber: number = 1) {
    this.store.dispatch(fetchSearchedMovies({ movieName: searchParam, pageNumber: pageNumber }));
    return this.store.select(searchedMovieSelector).subscribe(searchedMovies => {
      let response = searchedMovies;
      this.setData(response);
    });
  }

  getDataFromFilter(filter: string, pageNumber: number = 1) {
    this.store.dispatch(fetchFilteredMovies({ filter: filter, pageNumber: pageNumber }));
    return this.store.select(filteredMovieSelector).subscribe(filteredMovies => {
      let response = filteredMovies;
      this.setData(response);
    });
  }

  getTrendingMovies(pageNumber: number = 1) {
    this.store.dispatch(fetchTrendingMovies({ pageNumber }));
    return this.store.select(trendingMoviesSelector).subscribe(trendingMovies => {
      let response = trendingMovies;
      this.setData(response)
    });
  }

  setData(response: any) {
    this.maxPages = response?.total_pages;
    this.searchData = response?.results;
    this.isSkeleton = false;
  }

}
