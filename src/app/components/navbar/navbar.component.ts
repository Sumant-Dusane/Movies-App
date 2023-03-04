import { Component } from '@angular/core';
import { faSignal, faSearch } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  logoIcon = faSignal;
  searchIcon = faSearch;
}
