import { Component, Input } from '@angular/core';
import { faClock, faStar, faMap } from '@fortawesome/free-solid-svg-icons';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  @Input() isSkeleton: boolean | undefined;
  @Input() bundle: any;
  iconWatchLater = faClock;
  iconFavourites = faStar;

  constructor(private globalService: GlobalsService) {}

  addToWatchLater(imdbId: string) {
    this.globalService.addToWatchLater(imdbId);
  }

  addToFavourites(imdbId: string) {
    this.globalService.addToFavourites(imdbId);
  }

}
