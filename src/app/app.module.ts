import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { YouTubeService, YOUTUBE_API_KEY, YOUTUBE_API_URL } from "./youtube-search.service";

import { YouTubeSearchComponent } from './youtube-search.component';
import { SearchBoxComponent } from './search-box.component';
import { SearchResultComponent } from './search-result.component';

@NgModule({
  declarations: [
    YouTubeSearchComponent,
    SearchBoxComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    {provide: YouTubeService, useClass: YouTubeService},
    {provide: YOUTUBE_API_KEY, useValue: YOUTUBE_API_KEY},
    {provide: YOUTUBE_API_URL, useValue: YOUTUBE_API_URL}
  ],
  bootstrap: [YouTubeSearchComponent]
})
export class AppModule { }
