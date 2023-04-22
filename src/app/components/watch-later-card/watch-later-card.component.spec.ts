import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchLaterCardComponent } from './watch-later-card.component';

describe('WatchLaterCardComponent', () => {
  let component: WatchLaterCardComponent;
  let fixture: ComponentFixture<WatchLaterCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchLaterCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchLaterCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
