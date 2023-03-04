import { Component } from '@angular/core';
import { GlobalsService } from 'src/app/services/globals.service';
import { faSignal, faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  logoIcon = faSignal;
  searchIcon = faSearch;

  constructor(public globalservice: GlobalsService) {}
}
