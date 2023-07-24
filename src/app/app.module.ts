import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { MovieCardComponent } from './components/movie-card/movie-card.component';
import { WatchLaterComponent } from './components/watch-later/watch-later.component';
import { WatchLaterCardComponent } from './components/watch-later-card/watch-later-card.component';
import { NullStateComponent } from './components/null-state/null-state.component';
import { MovieDetailComponent } from './components/movie-detail/movie-detail.component';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './state/app.reducer';
import { AppEffect } from './state/app.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    SideBarComponent,
    MovieCardComponent,
    WatchLaterComponent,
    WatchLaterCardComponent,
    NullStateComponent,
    MovieDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature('app-state', appReducer),
    EffectsModule.forRoot([AppEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
