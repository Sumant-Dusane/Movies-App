import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { faClock, faStar, faMap, faWindowMinimize, faFilter } from '@fortawesome/free-solid-svg-icons';
import { filter, Subscription } from 'rxjs';
import { GlobalsService } from 'src/app/services/globals.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.scss']
})
export class SideBarComponent implements OnInit, OnDestroy {
  activeRoute: string | undefined;

  iconWatchLater = faClock;
  iconFavourites = faStar;
  iconExplore = faMap;
  iconMinimize = faWindowMinimize;
  iconFilter = faFilter

  sideBarSubscription: Subscription;

  filterExpanded: boolean = true;
  isCollapsed: boolean = true;

  selectedGenres: Array<any> = [];
  selectedFilters: FormGroup;
  genres: Array<any> = [
    {
      "id": 28,
      "name": "Action"
    },
    {
      "id": 12,
      "name": "Adventure"
    },
    {
      "id": 16,
      "name": "Animation"
    },
    {
      "id": 35,
      "name": "Comedy"
    },
    {
      "id": 80,
      "name": "Crime"
    },
    {
      "id": 99,
      "name": "Documentary"
    },
    {
      "id": 18,
      "name": "Drama"
    },
    {
      "id": 10751,
      "name": "Family"
    },
    {
      "id": 14,
      "name": "Fantasy"
    },
    {
      "id": 36,
      "name": "History"
    },
    {
      "id": 27,
      "name": "Horror"
    },
    {
      "id": 10402,
      "name": "Music"
    },
    {
      "id": 9648,
      "name": "Mystery"
    },
    {
      "id": 10749,
      "name": "Romance"
    },
    {
      "id": 878,
      "name": "Science Fiction"
    },
    {
      "id": 10770,
      "name": "TV Movie"
    },
    {
      "id": 53,
      "name": "Thriller"
    },
    {
      "id": 10752,
      "name": "War"
    },
    {
      "id": 37,
      "name": "Western"
    }
  ];

  constructor(private router: Router, private globalService: GlobalsService, private _fb: FormBuilder, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sideBarSubscription = this.globalService.isSideBarOpen.subscribe((status) => {
      this.isCollapsed = status;
    });

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.activeRoute = event.url;
        }
      });

    this.route.queryParams.subscribe(qparams => {
      const qparam = new URLSearchParams(qparams['filter']);
      let qgenres: any[] = []
      let qreleaseDateLte: any = qparam.get('release_date.lte') || '';
      let qreleaseDateGte: any = qparam.get('release_date.gte') || '';
      let qyear: any = qparam.get('year') || '';
      let qisAdult: boolean = (qparam.get('include_adult')?.toLowerCase() === 'true');

      qparam.forEach((value: any, key: any) => {
        if (key == 'with_genres') {
          qgenres = String(value).split(',').map(String);
          this.selectedGenres = qgenres;
        }
      });

      this.selectedFilters = this._fb.group({
        with_genres: this._fb.array(qgenres),
        release_date_lte: this._fb.control(qreleaseDateLte),
        release_date_gte: this._fb.control(qreleaseDateGte),
        year: this._fb.control(qyear),
        include_adult: this._fb.control(qisAdult),
      });
    });
  }

  onCheckBoxChange(e: any) {
    const checkedGenres: FormArray = this.selectedFilters.controls['with_genres'] as FormArray;
    if (e.target.checked) {
      checkedGenres.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkedGenres.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          checkedGenres.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

  checkBoxStatus(itemId: string): boolean {
    itemId = itemId.toString();
    return this.selectedGenres.indexOf(itemId) > -1;
  }

  resetFilters() {
    this.selectedFilters.reset();
  }

  modifyFilters() {
    if(this.selectedFilters.controls['year'].value != null) {
      let filters = '';
      for (var controlName in this.selectedFilters.controls) {
        const values = this.selectedFilters.get(controlName)?.value;
        if (values || values != '') {
          if (controlName == 'release_date_lte') {
            controlName = 'release_date.lte'
          }
          if (controlName == 'release_date_gte') {
            controlName = 'release_date.gte'
          }
          filters += `&${controlName}=${values}`;
        }
      }
      filters += '&sort_by=popularity.desc';
      this.router.navigate(['advanced'], { queryParams: { filter: filters } });
    } else {
      this.router.navigate(['home'], { queryParams: { filter: null } });
    }

  }

  ngOnDestroy(): void {
    this.sideBarSubscription.unsubscribe();
  }

}
