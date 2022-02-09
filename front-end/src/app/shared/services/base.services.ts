import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LocalStorageShared } from '../storage/localstorage';

export abstract class BaseService {
  public LocalStorage = new LocalStorageShared();
  protected UrlServiceV1 = environment.apiUrl;

  protected GetHeaderJson() {

    return {
      headers: new HttpHeaders({
        "content-type": "application/json; charset=utf-8",
        'Authorization': `Bearer ${this.LocalStorage.getTokenUser()}`
      }),
    };
  }

  protected extractData(response: any) {

    return response.data || {};
  }

  protected serviceError(response:  any) {
    let customError: string[] = [];
    let errors: string[] = [];
    let customResponse = { error: { errors }}

    if (response instanceof HttpErrorResponse) {
      if (response.statusText === 'Unknown Error') {
        customError.push('Ocorreu um erro desconhecido');
        response.error.errors = customError;
      }
    }
    if (response.status === 500) {
      customError.push(
        'Ocorreu um erro no processamento, tente novamente mais tarde ou contate o nosso suporte.'
      );

      // Erros do tipo 500 não possuem uma lista de erros
      // A lista de erros do HttpErrorResponse é readonly
      response.error.errors = customError;
      return throwError(()=>response);
    }
    if (response.status === 403) {

      customError.push(
        'Você não tem permissão para essa solicitação'
      );
      customResponse.error.errors = customError;


      return throwError(()=>customResponse);
    }
    console.error(response);
    return throwError(()=>response);
  }
}
