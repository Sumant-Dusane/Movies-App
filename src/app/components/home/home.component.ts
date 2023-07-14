import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { NetworkService } from 'src/app/services/Apis/network.service';
import { changeGlobalState, fetchSearchedMovies, fetchTrendingMovies } from 'src/app/state/app.action';
import { globalStateSelector, searchedMovieSelector, trendingMoviesSelector } from 'src/app/state/app.reducer';

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
    this.route.params.subscribe(params => {
      let urlParams = params['title'];
      if(urlParams) {
        this.store.dispatch(changeGlobalState({currentState: 'searched', 'pageNumber': 1}))
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
      }, 750)
    });
  }

  getDataFromSearch(searchParam: string) {
    return this.store.select(searchedMovieSelector).subscribe(searchedMovies => {
      let response = searchedMovies;
      if(response?.total_results == 0 || this.currentState?.currentState != 'searched') {
        this.store.dispatch(fetchSearchedMovies({movieName: searchParam}));
      }
      this.setData(response);
    })
  }

  getTrendingMovies() {
    return this.store.select(trendingMoviesSelector).subscribe(trendingMovies => {
      let response = trendingMovies;
      if(response?.total_results == 0 || this.currentState?.currentState != 'explore') {
        this.store.dispatch(fetchTrendingMovies());
      }
      this.setData(response)
    })
  }

  setData(reponse: any) {
    this.searchData = reponse?.results;
    this.isSkeleton = false;
  }

}
