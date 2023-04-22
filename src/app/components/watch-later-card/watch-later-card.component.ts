import { Component, Input } from '@angular/core';
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-watch-later-card',
  templateUrl: './watch-later-card.component.html',
  styleUrls: ['./watch-later-card.component.scss']
})
export class WatchLaterCardComponent {
  @Input() bundle: any;
  iconRemove = faClose;

  constructor(private globalService: GlobalsService) { }

  popFromWatchLater(imdbId: string) {
    let id = imdbId.substring(7).slice(0, -1);
    this.globalService.popFromWatchLater(id);
  }
}
