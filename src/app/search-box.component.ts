import { Component, Output } from "@angular/core/src/metadata/directives";
import { OnInit, EventEmitter, ElementRef } from "@angular/core";
import { SearchResult } from "./search-result";
import { Observable } from "rxjs";
import { YouTubeService } from "./youtube-search.service";

/**
 * SearchBox displays the search box and emits events based on the results
 */
@Component({
  selector: 'search-box',
  template: `
<input type="text" class="form-control" placeholder="Search" autofocus>
`
})
export class SearchBoxComponent implements OnInit {
  @Output() loading: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() results: EventEmitter<SearchResult[]> = new EventEmitter<SearchResult[]>();

  constructor(public youtube: YouTubeService,
              private el: ElementRef) {
  }

  ngOnInit(): void {
// convert the `keyup` event into an observable stream
    Observable.fromEvent(this.el.nativeElement, 'keyup')
      .map((e: any) => e.target.value) // extract the value of the input
      .filter((text: string) => text.length > 1) // filter out if empty
      .debounceTime(250)
      // only once every 250ms
      .do(() => this.loading.next(true))
      // enable loading
      // search, discarding old events if new input comes in
      .map((query: string) => this.youtube.search(query))
      .switch()
      // act on the return of the search
      .subscribe(
        (results: SearchResult[]) => { // on success

          this.loading.next(false);
          this.results.next(results);
        },
        (err: any) => { // on error
          console.log(err);
          this.loading.next(false);
        },
        () => { // on completion
          this.loading.next(false);
        }
      );
  }
}
