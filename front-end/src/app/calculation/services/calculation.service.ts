import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { BaseService } from 'src/app/shared/services/base.services';

@Injectable()
export class CalculationService extends BaseService {

    constructor(private http: HttpClient) {super();}

    makeCalculation(operation: any): Observable<any> {


      var url = this.UrlServiceV1 + 'calculation/operations';

      let response =   this.http
          .post(url, operation,this.GetHeaderJson())
          .pipe(
              map(this.extractData),
              catchError(this.serviceError));
              //return this.http.put<any>('http://localhost:5001/api/Auth/login', user);
     return response;
  }
}
