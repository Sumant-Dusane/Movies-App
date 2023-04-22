import { Component } from '@angular/core';
import { NetworkService } from 'src/app/services/Apis/network.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent {

  watchLater: any;
  isLoading: boolean;
  moviesData: any[] = [];

  constructor(private globalService: GlobalsService, private networkService: NetworkService) {
    this.watchLater = JSON.parse(this.globalService.watchLater);
    if (this.watchLater) {
      for(let i = 0; i < this.watchLater.length; i++) {
        this.getDatafromID(this.watchLater[i], i == this.watchLater.length - 1 ? false : true);
      }
    }
  }

  getDatafromID(id: string, isLoading: boolean) {
    this.networkService.getDatafromID(id).subscribe(data => {
      let response = data;
      this.setData(response, isLoading);
    });
  }

  setData(response: any, isLoading: boolean) {
    this.moviesData.push(response);
    this.isLoading = isLoading;
  }
}
