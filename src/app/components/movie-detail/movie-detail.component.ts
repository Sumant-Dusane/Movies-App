import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/Apis/network.service';
import { GlobalsService } from 'src/app/services/globals.service';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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
  YTTitle: string;
  movieVideos: any;
  sanitizerInstance: any;
  YTURL: string;
  isModalVisible: boolean = false;

  constructor(private globalService: GlobalsService, private networkService: NetworkService, private router: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.router.params.subscribe(param => {
      this.isLoading = true;
      this.getDatafromID(param['id']);
      this.getDataMedia(param['id']);
    })
    this.sanitizerInstance = this.sanitizer;
  }

  ngOnInit(): void {
    this.globalService.updateSideBarVisibility(false);
    this.baseUrl = this.networkService.baseUrl;
  }

  getDatafromID(id: string) {
    this.networkService.getDatafromID(id).subscribe(data => {
      let response = data;
      this.setData(response);
    });
  }

  openModal(){
    this.isModalVisible = true;
    this.globalService.updateNavBarVisibility(false);
  }

  closeModal(){
    this.isModalVisible = false;
    this.globalService.updateNavBarVisibility(true);
  }

  getDataMedia(id: string) {
    this.networkService.getDataMedia(id).subscribe(data => {
      let response = data;
      this.setVideoUrl(response);
    })
  }

  setVideoUrl(response: any) {
    this.movieVideos = response?.results[0];
    if(this.movieVideos?.site == 'YouTube') {
      this.YTURL = 'https://www.youtube.com/embed/' + this.movieVideos?.key;
      this.YTTitle = this.movieVideos?.name;
    }
  }

  getYTUrl() {
    return this.sanitizerInstance.bypassSecurityTrustResourceUrl(this.YTURL);
  }

  setData(response: any) {
    this.movieData = response;
    this.isLoading = false;
  }

  ngOnDestroy(): void {
    this.globalService.updateSideBarVisibility(true);
    this.globalService.updateNavBarVisibility(true);
  }

}
