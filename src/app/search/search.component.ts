import {Component, Injectable, ViewEncapsulation} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of, OperatorFunction} from 'rxjs';
import {catchError, debounceTime, distinctUntilChanged, map, tap, switchMap} from 'rxjs/operators';

const TMDB = 'https://tmdbuscapivc.wl.r.appspot.com/search?querystring=';
const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*'
  }
});

@Injectable()
export class TMDBService {
  constructor(private http: HttpClient) {}

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    var res = [];

    res = ['k']
    console.log(this.http
      .get<any>(TMDB + term).pipe(
        map(data => data)
      ))
    return this.http
      .get<any>(TMDB + term).pipe(
        map(data => data.slice(0,7))
      );
  }
}



@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  providers: [TMDBService],
  styles: [`.form-control { width: 300px; }`],
  encapsulation: ViewEncapsulation.None
})
export class SearchComponent {
  model: any;
  searching = false;
  searchFailed = false;

  constructor(private _service: TMDBService) {}

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term =>
        this._service.search(term).pipe(
          tap(() => this.searchFailed = false),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )
    formatter = (x: {name: string}) => x.name;

}
