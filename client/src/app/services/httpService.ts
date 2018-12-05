import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { finalize, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
//import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Router, ActivatedRoute } from '@angular/router';


@Injectable()
export class HttpService {
   private apiUrl = 'http://localhost:8000/';     

   constructor(private httpClient: HttpClient,private router: Router,
               private route: ActivatedRoute) {
    this.apiUrl = 'http://localhost:8000/';
  }

   get(url: string, params?: any) {
       /**
        * http get method
        * @param url - url for http request
        * @param params it construct the url with given params
        */
       return this.httpClient.get<any>(this.apiUrl.concat(url), {
           params: params
       }).pipe(
           finalize(() => {
           }),
           catchError(this.handleError)
        );
   }

   post(url: string, params: any) {
       /**
       * http get method
       * @param url - url for http request
       * @param params it construct the url with given params
       */
       return this.httpClient.post<any>(this.apiUrl.concat(url), params)
           .pipe(
            finalize(() => {
            }),
            catchError(this.handleError)
           );
   }


  put(url: string, params: any) {
    /**
     * http get method
     * @param url - url for http request
     * @param params it construct the url with given params
     * update all data in particular document
     */
    return this.httpClient
      .put(this.apiUrl.concat(url), params)
      .pipe(
        finalize(() => {
        }),
        catchError(this.handleError)
       );
  }

  delete(url: string, params: any){
    /**
     * http get method
     * @param url - url for http request
     * @param params it construct the url with given params
     * here params means sending particular field value to match and update (eg: {id:"1"})
     */
    return this.httpClient
      .delete(this.apiUrl.concat(url), params)
      .pipe(
        finalize(() => {
        }),  
        catchError(this.handleError)
      );
  }
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
        var formData: any = new FormData();
        var xhr = new XMLHttpRequest();
        for(var i = 0; i < files.length; i++) {
            formData.append("uploads[]", files[i], files[i].name);
        }
        xhr.onreadystatechange = function () {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    resolve(JSON.parse(xhr.response));
                } else {
                    reject(xhr.response);
                }
            }
        }
        xhr.open("POST", this.apiUrl.concat(url), true);
        xhr.send(formData);
        //this.spinnerService.hide();
    });
}

   private handleError(error: HttpErrorResponse) {
       if (error.error instanceof ErrorEvent) {
           // A client-side or network error occurred. Handle it accordingly.
           console.error('An error occurred:', error.error.message);
       } else {
           // The backend returned an unsuccessful response code.
           // The response body may contain clues as to what went wrong,
           console.error(
               `Backend returned code ${error.status}, ` +
               `body was: ${error.error}`);
       }
       // return an ErrorObservable with a user-facing error message
       return throwError(
           'Something bad happened; please try again later.');
   };
}
