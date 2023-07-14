import { Component, OnInit } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { faSignal, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Subscription } from 'rxjs/internal/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  logoIcon = faSignal;
  searchIcon = faSearch;
  movieName: string;
  navbarSubscription: Subscription;
  isCollapsed: boolean = true;

  constructor(public globalservice: GlobalsService, private router: Router) { }

  ngOnInit(): void {
    this.navbarSubscription = this.globalservice.isNavbarOpen.subscribe((status) => {
      this.isCollapsed = status;
    })
  }

  searchMovie(movieName: string): void {
    this.router.navigate(['/search/' + movieName]);
  }

}
