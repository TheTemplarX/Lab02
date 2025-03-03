import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { map, catchError, tap } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class RestService {

  private apiUrl = 'https://restcountries.com/v3.1/all?fields=name,capital,flags,region';
  constructor(private http: HttpClient) { }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
    const err = error || '';
    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
    errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return throwError(errMsg);
  }

  private extractData(res: any) {
    const body = res;
    return body || { };
  }

  getCountries(): Observable<any> {
    return this.http.get(this.apiUrl).pipe(
    map(this.extractData),
    catchError(this.handleError)
    );
  }
}
