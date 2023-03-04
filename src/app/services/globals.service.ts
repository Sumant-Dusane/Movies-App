import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalsService {

  constructor() { }

  redirectToLink(link: string) {
    if( confirm('Redirectng to ' + link) === true ) {
      window.location.href = link;
    }
  }
}
