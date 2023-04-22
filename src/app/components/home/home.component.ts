import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NetworkService } from 'src/app/services/Apis/network.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent{
  isSkeleton: boolean = true;
  searchData: any;

  constructor(private route: ActivatedRoute,private networkService: NetworkService) {
    this.route.params.subscribe(params => {
      this.isSkeleton = true;
      this.getDataFromSearch(params['title']);
    });
  }

  getDataFromSearch(searchParam: string) {
    this.networkService.getDatafromSearch(searchParam).subscribe(data => {
      let reponse = data;
      this.setData(reponse);
    });
  }

  setData(reponse: any) {
    this.searchData = reponse.d;
    this.isSkeleton = false;
    console.log(this.searchData);
  }

}
