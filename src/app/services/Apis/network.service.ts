import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Movie from 'src/app/state/app.state';

@Injectable({
  providedIn: 'root',
})
export class NetworkService {

  baseUrl = 'https://image.tmdb.org/t/p/w1280';
  apiKey = '507af3f601c7cc39022ad9ceb9dcbb4a';
  endpoint = 'https://api.themoviedb.org/3/';

  constructor(private http: HttpClient) {  }

  getDatafromSearch(searchParam: string | null) {
    let url = this.endpoint + 'search/movie?query=' + searchParam  +  '&api_key=' + this.apiKey;
    return this.http.get<Movie>(url);
  }

  getDataMedia(id: string) {
    let url = this.endpoint + 'movie/' + id + '/videos?api_key=' + this.apiKey;
    return this.http.get(url);
  }

  getTrendingMovies() {
    let url = this.endpoint + 'movie/popular?api_key=' + this.apiKey;
    return this.http.get<Movie>(url);
  }

  getDatafromID(id: string) {
    let url = this.endpoint + 'movie/' + id + '?api_key=' + this.apiKey;
    return this.http.get<any>(url);
  }

  getDataFromFilters(filters: string) {
    let url = this.endpoint + 'discover/movie?&api_key=' + this.apiKey + filters;
    return this.http.get<Movie>(url);
  }
}
