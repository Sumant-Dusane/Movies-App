import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { NullStateComponent } from './components/null-state/null-state.component';
import { WatchLaterComponent } from './components/watch-later/watch-later.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'search/:title', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'advanced', component: HomeComponent},
  {path: 'movie/:id', component: MovieDetailComponent},
  {path: 'watch-later', component: WatchLaterComponent},
  {path: '404-not-found', component: NullStateComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
