import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LoginRegisterService {

  constructor(private http: HttpClient) { }

  loginRegisterRequest(type: string, formModel): Observable<any> { // type it is also a part of route within express server listeners
    return this.http.post<string>('/' + type, formModel);
  }

}
