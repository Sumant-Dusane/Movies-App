import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {

  apikey = '39ccf8ac';
  endpoint = 'https://www.omdbapi.com/?apikey=' + this.apikey;

  constructor(private http: HttpClient) { }

  getDatafromSearch(searchParam: string | null) {
    let url = this.endpoint + '&s=' + searchParam;
    return this.http.get(url);
  }

  // getTrendingMoviesID() {
  //   this.topMoviesId$ = this.get('https://imdb8.p.rapidapi.com/title/get-top-rated-movies')
  // }

  // getDatafromID(id: string = 'tt0944947') {
  //   this.dataFromID$ = this.get('https://imdb8.p.rapidapi.com/title/get-details?tconst='+id)
  // }

}
