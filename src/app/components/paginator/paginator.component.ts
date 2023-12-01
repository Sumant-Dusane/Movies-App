import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { changeGlobalState } from 'src/app/state/app.action';
import { globalStateSelector } from 'src/app/state/app.reducer';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit{
  activePage: number;
  currentState: string;
  pages: Array<number> = [];
  @Input() maxPage: number;

  constructor (private store: Store) {
    this.store.select(globalStateSelector).subscribe(state => {
      this.activePage = state?.pageNumber;
      this.currentState = state?.currentState;
    });
  }

  ngOnInit(): void {
    this.initPages();
  }

  handlePageState() {
    if(this.activePage > this.maxPage) {
      this.activePage = this.maxPage
    }

    if(this.activePage <= 0) {
      this.activePage = 1;
    }

    this.store.dispatch(changeGlobalState({currentState: this.currentState ,pageNumber: this.activePage}));
  }

  initPages() {
    if(this.maxPage > 500) {
      this.maxPage = 500;
    }
    for(let i = 1; i <= this.maxPage; i++) {
      if(i <= 4) {
        this.pages.push(i)
      }
    }
    this.pages.push(this.activePage);
    this.pages.push(this.maxPage);
  }

  changePage(pageNumber: number) {
    this.activePage = parseInt(pageNumber.toString());
    this.handlePageState();
  }
}
