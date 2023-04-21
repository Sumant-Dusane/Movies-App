import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { WatchLaterComponent } from './components/watch-later/watch-later.component';

const routes: Routes = [
  {path: '', redirectTo: '/home/welcome', pathMatch: 'full'},
  {path: 'home/:title', component: HomeComponent},
  {path: 'watch-later', component: WatchLaterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
