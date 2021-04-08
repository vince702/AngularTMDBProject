import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CarouselBasicComponent } from './carousel-basic/carousel-basic.component';
//import { SearchComponent } from './search/search.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { MultiComponent } from './multi/multi.component';
import {WatchComponent} from './watch/watch/watch.component';

import { HttpClientModule } from '@angular/common/http';
import { HomepageComponent } from './homepage/homepage.component';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { YouTubePlayer } from '@angular/youtube-player';
import { ActorModalComponent } from './actor-modal/actor-modal.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    CarouselBasicComponent,
    //SearchComponent,
    NavbarComponent,
    MultiComponent,
    HomepageComponent,
    WatchComponent,
    ActorModalComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule,
    YouTubePlayerModule,
    RouterModule.forRoot([
      {path: 'home', component: HomepageComponent },
      {path: '', component: HomepageComponent },
      {path: 'mylist', component: CarouselBasicComponent },
      {path: 'watch/:type/:id', component: WatchComponent },


    ]),
  ],
  providers: [],
  bootstrap: [AppComponent]

})
export class AppModule { }
