import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/Apis/network.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss']
})
export class MovieDetailComponent implements OnInit, OnDestroy{

  isLoading: boolean;
  movieData: any;
  baseUrl: string;
  playIcon = faPlayCircle;

  constructor(private globalService: GlobalsService, private networkService: NetworkService, private router: ActivatedRoute) {
    this.router.params.subscribe(param => {
      this.isLoading = true;
      this.getDatafromID(param['id']);
    })
  }

  ngOnInit(): void {
    this.globalService.isNavbarOpen = false;
    this.globalService.updateSideBarVisibility(false);
    this.baseUrl = this.networkService.baseUrl;
  }

  getDatafromID(id: string) {
    this.networkService.getDatafromID(id).subscribe(data => {
      let response = data;
      this.setData(response);
    });
  }

  setData(response: any) {
    this.movieData = response;
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.globalService.updateSideBarVisibility(true);
  }

}
