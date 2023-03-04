import { Component } from '@angular/core';
import { faClock, faStar, faMap } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  iconWatchLater = faClock;
  iconFavourites = faStar;
  iconExplore = faMap;

  activeClass: number = 1;

  activeState(element: number) {
    this.activeClass = element;
  }
}
