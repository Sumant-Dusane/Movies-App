import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { faClock, faStar, faMap } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { NetworkService } from 'src/app/services/Apis/network.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { fetchMovieFromID } from 'src/app/state/app.action';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent  implements OnInit {
  @Input() isSkeleton: boolean | undefined;
  @Input() bundle: any;
  iconWatchLater = faClock;
  iconFavourites = faStar;
  popularityClass: string;
  isAddedToWatchLater: boolean = false;
  isAddedToFavourites: boolean = false;
  imageBaseUrl = this.networkService.baseUrl;

  constructor(private globalService: GlobalsService, private networkService: NetworkService, private store: Store) {}

  ngOnInit(): void {
    this.ratingState();
    // if (this.globalService.watchLater.includes(this.bundle?.id)) {
    //   this.isAddedToWatchLater = true;
    // }
    // if (this.globalService.favourites.includes(this.bundle?.id)) {
    //   this.isAddedToFavourites = true;
    // }
  }


  toggleWatchLater(imdbId: string) {
    if(!this.isAddedToWatchLater) {
      this.globalService.toggleWatchLater(imdbId);
      this.isAddedToWatchLater=true;
    }
    this.store.dispatch(fetchMovieFromID({movieId: imdbId}));
  }

  toggleFavourites(imdbId: string) {
    if(!this.isAddedToFavourites) {
      this.globalService.toggleFavourites(imdbId);
    }
  }

  ratingState() {
    if(this.bundle?.popularity >= 80) {
      this.popularityClass = 'card__type--A'
    } else if(this.bundle?.popularity > 50){
      this.popularityClass = 'card__type--B'
    } else if(this.bundle?.popularity > 30){
      this.popularityClass = 'card__type--C'
    } else if(this.bundle?.popularity >= 10){
      this.popularityClass = 'card__type--D'
    } else if(this.bundle?.popularity < 10){
      this.popularityClass = 'card__type--E'
    }
  }
}
