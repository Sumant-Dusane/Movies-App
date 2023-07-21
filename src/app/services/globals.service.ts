import { Location } from '@angular/common';
import { EventEmitter, Injectable } from '@angular/core';;

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  watchLater: any;
  favourites: any;
  isSideBarOpen = new EventEmitter<boolean>();
  isNavbarOpen = new EventEmitter<boolean>();

  constructor(private location: Location) {
    this.watchLater = localStorage.getItem('watchLater');
    this.favourites = localStorage.getItem('favourites');
  }

  redirectToLink(link: string) {
    if( confirm('Redirectng to ' + link) === true ) {
      window.location.href = link;
    }
  }

  updateSideBarVisibility(isVisible: boolean) {
    this.isSideBarOpen.emit(isVisible);
  }

  updateNavBarVisibility(isVisible: boolean) {
    this.isNavbarOpen.emit(isVisible);
  }

  goBack() {
    this.location.back();
  }

  toggleWatchLater(imdbId: string) {
    let arrId : any[] = [];
    if(this.watchLater) {
      arrId = JSON.parse(this.watchLater);
    }
    if(arrId.includes(imdbId)) {
      this.popFromWatchLater(imdbId);
      return;
    }else {
      arrId.push(imdbId);
    }
    this.watchLater = JSON.stringify(arrId);
    localStorage.setItem('watchLater', this.watchLater);
  }

  toggleFavourites(imdbId: string) {
    let arrId : any[] = [];
    if(this.favourites) {
      arrId = JSON.parse(this.favourites);
    }
    if(arrId.includes(imdbId)) {
      this.popFromFavourites(imdbId);
      return;
    }else {
      arrId.push(imdbId);
    }
    this.favourites = JSON.stringify(arrId);
    localStorage.setItem('favourites', this.favourites);
  }

  popFromWatchLater(imdbId: string) {
    let arrId :any[] = [];
    if(this.watchLater) {
      arrId = JSON.parse(this.watchLater);
    }
    arrId.forEach((e, i) => {
      if (e == imdbId) arrId.splice(i, 1);
    });
    this.watchLater = JSON.stringify(arrId);
    localStorage.setItem('watchLater', this.watchLater);
  }

  popFromFavourites(imdbId: string) {
    let arrId :any[] = [];
    if(this.favourites) {
      arrId = JSON.parse(this.favourites);
    }
    arrId.forEach((e, i) => {
      if (e == imdbId) arrId.splice(i, 1);
    });
    this.favourites = JSON.stringify(arrId);
    localStorage.setItem('favourites', this.favourites);
  }
}
