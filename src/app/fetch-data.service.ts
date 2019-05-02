import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { gunItem } from './gun-item/gun-item.component';

@Injectable()
export class FetchDataService {

  constructor(private http: HttpClient) { }

  fetchData(type: string, filter: any): Observable<string> { // type it is also a part of route within express server listeners
    return this.http.post<string>('/' + type, filter);
  }

}
