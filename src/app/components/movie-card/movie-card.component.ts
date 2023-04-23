import { Component, Input, OnInit } from '@angular/core';
import { faClock, faStar, faMap } from '@fortawesome/free-solid-svg-icons';
import { NetworkService } from 'src/app/services/Apis/network.service';
import { GlobalsService } from 'src/app/services/globals.service';

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
  imageBaseUrl = this.networkService.baseUrl;

  constructor(private globalService: GlobalsService, private networkService: NetworkService) {}

  ngOnInit(): void {
    this.ratingState();
  }

  addToWatchLater(imdbId: string) {
    this.globalService.addToWatchLater(imdbId);
  }

  addToFavourites(imdbId: string) {
    this.globalService.addToFavourites(imdbId);
  }

  ratingState() {
    if(this.bundle?.popularity) {}
    if(this.bundle?.popularity > 100) {
      this.popularityClass = 'card__type--A'
    } else if(this.bundle?.popularity > 50){
      this.popularityClass = 'card__type--B'
    } else if(this.bundle?.popularity > 30){
      this.popularityClass = 'card__type--C'
    } else if(this.bundle?.popularity > 10){
      this.popularityClass = 'card__type--D'
    } else if(this.bundle?.popularity < 10){
      this.popularityClass = 'card__type--E'
    }
  }
}
