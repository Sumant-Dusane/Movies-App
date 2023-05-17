import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {

  baseUrl = 'https://image.tmdb.org/t/p/w500';
  apiKey = '507af3f601c7cc39022ad9ceb9dcbb4a';
  endpoint = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) {

  }

  getDatafromSearch(searchParam: string | null) {
    let url = this.endpoint + 'search/movie?query=' + searchParam  +  '&api_key=' + this.apiKey;
    return this.http.get(url);
  }

  getTrendingMovies() {
    let url = this.endpoint + 'movie/popular?api_key=' + this.apiKey;
    return this.http.get(url);
  }

  getDatafromID(id: string) {
    let url = this.endpoint + 'movie/' + id + '?api_key=' + this.apiKey;
    return this.http.get(url);
  }
}
