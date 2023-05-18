import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faClock, faStar, faMap } from '@fortawesome/free-solid-svg-icons';
import { filter, Subscription } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit,OnDestroy{
  activeRoute :string | undefined;
  iconWatchLater = faClock;
  iconFavourites = faStar;
  iconExplore = faMap;
  sideBarSubscription: Subscription;
  isCollapsed: boolean = true;

  constructor(private router: Router, private globalService: GlobalsService) { }

  ngOnInit(): void {
    this.sideBarSubscription = this.globalService.isSideBarOpen.subscribe((status) => {
      this.isCollapsed = status;
    });

    this.router.events
    .pipe(filter(event => event instanceof NavigationEnd))
    .subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeRoute = event.url;
      }
    });
  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }

}
