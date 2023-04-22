import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {

  headers = new HttpHeaders({
    'x-rapidapi-host': 'imdb8.p.rapidapi.com',
    'x-rapidapi-key': '7c1834b123msh528683e4aab2695p16995fjsn5ec42d00ed6b'
  });

  // apikey = '39ccf8ac';
  // endpoint = 'https://www.omdbapi.com/?apikey=' + this.apikey;

  endpoint = 'https://imdb8.p.rapidapi.com/';

  constructor(private http: HttpClient) { }

  getDatafromSearch(searchParam: string | null) {
    let url = this.endpoint + 'auto-complete?q=' + searchParam;
    return this.http.get(url, {headers: this.headers});
  }

  // getTrendingMoviesID() {
  //   this.topMoviesId$ = this.get('https://imdb8.p.rapidapi.com/title/get-top-rated-movies')
  // }

  // getDatafromID(id: string = 'tt0944947') {
  //   this.dataFromID$ = this.get('https://imdb8.p.rapidapi.com/title/get-details?tconst='+id)
  // }

}
