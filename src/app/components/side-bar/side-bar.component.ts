import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faClock, faStar, faMap } from '@fortawesome/free-solid-svg-icons';
import { filter, map } from 'rxjs';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent {
  activeRoute :string| undefined;
  iconWatchLater = faClock;
  iconFavourites = faStar;
  iconExplore = faMap;

  constructor(private router: Router) {
    router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }

}
