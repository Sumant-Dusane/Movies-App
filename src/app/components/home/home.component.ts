import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { filter } from 'rxjs';
import { NetworkService } from 'src/app/services/Apis/network.service';
import { changeGlobalState, fetchFilteredMovies, fetchSearchedMovies, fetchTrendingMovies } from 'src/app/state/app.action';
import { filteredMovieSelector, globalStateSelector, searchedMovieSelector, trendingMoviesSelector } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent{
  isSkeleton: boolean = true;
  searchData: any;
  currentState: any;

  constructor(private route: ActivatedRoute,private networkService: NetworkService, private store: Store) {
    let queryParams = '';
    let urlParams = '';
    this.route.queryParams.subscribe(qparams => {
      queryParams = qparams['filter'];
      if(queryParams) {
        this.handleStates('', queryParams);
      }
    });
    this.route.params.subscribe(params => {
      urlParams = params['title'];
      if(urlParams) {
        this.handleStates(urlParams, '');
      }
    });
    if(!urlParams && !queryParams) {
      this.handleStates('', '');
    }
  }

  handleStates(urlParams: any, queryParams: any) {
    if(urlParams) {
      this.store.dispatch(changeGlobalState({currentState: 'searched', 'pageNumber': 1}))
    }else if(queryParams) {
      this.store.dispatch(changeGlobalState({currentState: 'filtered', 'pageNumber': 1}))
    }else {
      this.store.dispatch(changeGlobalState({currentState: 'explore', 'pageNumber': 1}))
    }
    this.isSkeleton = true;
    setTimeout(() => {
      this.store.select(globalStateSelector).subscribe(state => {
        this.currentState = state;
       });
       if(this.currentState?.currentState == 'explore') {
         this.getTrendingMovies();
       }
       if(this.currentState?.currentState == 'searched') {
         this.getDataFromSearch(urlParams);
       }
       if(this.currentState?.currentState == 'filtered') {
         this.getDataFromFilter(queryParams);
       }
    }, 750)
  }

  getDataFromSearch(searchParam: string) {
    this.store.dispatch(fetchSearchedMovies({movieName: searchParam}));
    return this.store.select(searchedMovieSelector).subscribe(searchedMovies => {
      let response = searchedMovies;
      this.setData(response);
    });
  }

  getDataFromFilter(filter: string) {
    this.store.dispatch(fetchFilteredMovies({filter: filter}));
    return this.store.select(filteredMovieSelector).subscribe(filteredMovies => {
      let response = filteredMovies;
      this.setData(response);
    });
  }

  getTrendingMovies() {
    this.store.dispatch(fetchTrendingMovies());
    return this.store.select(trendingMoviesSelector).subscribe(trendingMovies => {
      let response = trendingMovies;
      this.setData(response)
    });
  }

  setData(reponse: any) {
    this.searchData = reponse?.results;
    this.isSkeleton = false;
  }

}
