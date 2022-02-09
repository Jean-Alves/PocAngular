import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';

import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { BaseService } from 'src/app/shared/services/base.services';

@Injectable()
export class AccountService extends BaseService {

    constructor(private http: HttpClient) {super();}

    login(user: User): Observable<User> {


      var url = this.UrlServiceV1 + 'auth/login';
      let response =   this.http
          .post(url, user,this.GetHeaderJson())
          .pipe(
              map(this.extractData),
              catchError(this.serviceError));
              //return this.http.put<any>('http://localhost:5001/api/Auth/login', user);
     return response;
  }
}
