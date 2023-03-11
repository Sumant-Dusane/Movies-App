import { Component } from '@angular/core';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-watch-later',
  templateUrl: './watch-later.component.html',
  styleUrls: ['./watch-later.component.scss']
})
export class WatchLaterComponent {
  iconDelete = faTrashCan;
}
