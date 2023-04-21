import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { faSignal, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NetworkService } from 'src/app/services/Apis/network.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  logoIcon = faSignal;
  searchIcon = faSearch;
  movieName: string;

  constructor(public globalservice: GlobalsService) { }

}
