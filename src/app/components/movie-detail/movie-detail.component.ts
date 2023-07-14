import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GlobalsService } from 'src/app/services/globals.service';
import { faPlayCircle, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { appendMovieDetailedInfoMedia, changeGlobalState, fetchMovieDetailedInfo } from 'src/app/state/app.action';
import { movieDetailedSelector } from 'src/app/state/app.reducer';
import { NetworkService } from 'src/app/services/Apis/network.service';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy{

  isLoading: boolean;
  movieData: any;
  baseUrl: string;
  playIcon = faPlayCircle;
  backIcon = faArrowCircleLeft;
  YTTitle: string;
  backdropPath: string;
  movieVideos: any;
  runtime: any;
  hasTrailer: boolean;
  sanitizerInstance: any;
  YTURL: string;
  isModalVisible: boolean = false;

  constructor(private globalService: GlobalsService, private store: Store, private router: ActivatedRoute, private sanitizer: DomSanitizer, private networkService: NetworkService) {
    this.router.params.subscribe(param => {
      this.isLoading = true;
      if(param['id']) {
        this.store.dispatch(fetchMovieDetailedInfo({movieId: param['id']}));
        this.store.dispatch(appendMovieDetailedInfoMedia({movieId: param['id']}));
        this.store.dispatch(changeGlobalState({currentState: 'detailed', pageNumber: 1}))
        setTimeout(() => {
          this.store.select(movieDetailedSelector).subscribe(movieData => {
            let response = movieData;
            if(response) {
              this.setData(response)
            }
          });
        }, 750)
      }
    })
    this.sanitizerInstance = this.sanitizer;
  }

  ngOnInit(): void {
    this.globalService.updateSideBarVisibility(false);
    this.baseUrl = this.networkService.baseUrl;
  }

  openModal(){
    this.isModalVisible = true;
    this.globalService.updateNavBarVisibility(false);
  }

  closeModal(){
    this.isModalVisible = false;
    this.globalService.updateNavBarVisibility(true);
  }

  goBack() {
    this.globalService.goBack();
  }

  setVideoUrl(response: any) {
    this.movieVideos = response;
    for(let index in this.movieVideos) {
      if(this.movieVideos[index]?.site == 'YouTube' && this.movieVideos[index]?.type == 'Trailer') {
        if(this.movieVideos[index]?.name.includes('Trailer')) {
          this.hasTrailer = true;
          this.YTURL = 'https://www.youtube.com/embed/' + this.movieVideos[index]?.key;
          this.YTTitle = this.movieVideos[index]?.name;
          return
        } else {
          this.hasTrailer = false;
        }
      }
    }
  }

  getYTUrl() {
    if(this.YTURL) {
      return this.sanitizerInstance.bypassSecurityTrustResourceUrl(this.YTURL);
    }
  }

  setData(response: any) {
    this.movieData = response;
    this.setVideoUrl(response?.movieMediaData?.results);
    this.backdropPath = this.baseUrl + this.movieData?.backdrop_path;
    this.isLoading = false;
    this.runtime = String((this.movieData?.runtime / 60).toFixed(2)).split('.');
    this.runtime = this.runtime[0] + 'h ' + this.runtime[1] + 'mins';
  }

  ngOnDestroy(): void {
    this.globalService.updateSideBarVisibility(true);
    this.globalService.updateNavBarVisibility(true);
  }

}
