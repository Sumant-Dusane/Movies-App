import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  watchLater: any;
  favourites: any;

  constructor() {
    this.watchLater = localStorage.getItem('watchLater');
    this.favourites = localStorage.getItem('favourites');
  }

  redirectToLink(link: string) {
    if( confirm('Redirectng to ' + link) === true ) {
      window.location.href = link;
    }
  }

  addToWatchLater(imdbId: string) {
    let arrId : any[] = [];
    if(this.watchLater) {
      arrId = JSON.parse(this.watchLater);
    }
    arrId.push(imdbId);
    this.watchLater = JSON.stringify(arrId);
    localStorage.setItem('watchLater', this.watchLater);
  }

  addToFavourites(imdbId: string) {
    let arrId : any[] = [];
    if(this.favourites) {
      arrId = JSON.parse(this.favourites);
    }
    arrId.push(imdbId);
    this.favourites = JSON.stringify(arrId);
    localStorage.setItem('favourites', this.favourites);
  }
}
