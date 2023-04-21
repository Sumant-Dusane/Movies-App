import { Component } from '@angular/core';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent {
  iconDelete = faTrashCan;
  watchLater: any;

  constructor(private globalService: GlobalsService) {
    this.watchLater = this.globalService.watchLater;
    console.log(this.watchLater);
  }
}
