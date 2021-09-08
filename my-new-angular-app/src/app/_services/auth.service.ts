import { Injectable } from '@angular/core';
import { CustomUser} from '../models';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError , map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  endpoint: string = 'http://127.0.0.1:8000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};
  constructor(private http: HttpClient,
              public router: Router
  ) { 

  }
  signUp(user: CustomUser): Observable<any> {
    let api = `${this.endpoint}/register`;
    return this.http.post(api,user)
      .pipe(
        catchError(this.handleError)
      )
  }

  signIn(user: CustomUser){
    return this.http.post<any>(`${this.endpoint}/login`, user)
      .subscribe((res:any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res.pk).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['profiles/' + res.msg.pk]);
        })
      })
  }

  getToken(){
    return localStorage.getItem('access_token');
  }

  get isLoggedIn(): boolean{
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout(){
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null){
      this.router.navigate(['signin']);
    }
  }
  
  getUserProfile(pk: any): Observable<any> {
    let api = `${this.endpoint}/profiles/${pk}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    let msg = '';
    if(error.error instanceof ErrorEvent){

      msg = error.error.message;
    }else {
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
  
}
