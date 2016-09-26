import { Injectable, Inject } from "@angular/core";
import { Http, Response } from "@angular/http";
import { SearchResult } from "./search-result";
import { Observable } from "rxjs";

export var YOUTUBE_API_KEY: string = "AIzaSyAJaPy4KW9ZH9D8KjrtrUHPrzI-XQ25WSs";
export var YOUTUBE_API_URL: string = "https://www.googleapis.com/youtube/v3/search";

/**
 * YouTubeService connects to the YouTube API
 * See: * https://developers.google.com/youtube/v3/docs/search/list
 */
@Injectable()
export class YouTubeService {
  constructor(public http: Http,
              @Inject(YOUTUBE_API_KEY) private apiKey: string,
              @Inject(YOUTUBE_API_URL) private apiUrl: string) {
  }

  search(query: string): Observable<SearchResult[]> {
    let params: string = [
      `q=${query}`,
      `key=${this.apiKey}`,
      `part=snippet`,
      `type=video`,
      `maxResults=10`
    ].join('&');
    let queryUrl: string = `${this.apiUrl}?${params}`;
    console.log('Query: ' + queryUrl);
    return this.http.get(queryUrl)
      .map((response: Response) => {
        return (<any>response.json()).items.map(item => {
// console.log("raw item", item); // uncomment if you want to debug
          return new SearchResult({
            id: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnailUrl: item.snippet.thumbnails.high.url
          });
        });
      });
  }

}
