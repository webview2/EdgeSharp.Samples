import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { TmdbMoviesComponent } from './components/tmdbmovies/tmdb-movies.component';
import { ServiceConfig } from './services/service.config';
import { ActionClientService } from './services/action.controller.client.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TmdbMoviesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ServiceConfig, ActionClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
