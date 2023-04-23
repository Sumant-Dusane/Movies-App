import { Component, Input, OnInit } from '@angular/core';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { NetworkService } from 'src/app/services/Apis/network.service';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-watch-later-card',
  templateUrl: './watch-later-card.component.html',
  styleUrls: ['./watch-later-card.component.scss']
})
export class WatchLaterCardComponent implements OnInit{
  @Input() bundle: any;
  iconRemove = faClose;
  year: string;
  imageBaseUrl = this.networkService.baseUrl;

  constructor(private globalService: GlobalsService, private networkService: NetworkService) { }

  ngOnInit(): void {
    this.year = this.bundle.release_date.slice(0, 4);
  }

  popFromWatchLater(imdbId: string) {
    this.globalService.popFromWatchLater(imdbId);
  }
}
