import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-null-state',
  templateUrl: './null-state.component.html',
  styleUrls: ['./null-state.component.scss']
})
export class NullStateComponent {
  @Input() statusCode: number;
  @Input() source: string;
}
