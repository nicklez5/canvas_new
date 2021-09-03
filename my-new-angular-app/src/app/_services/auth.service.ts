import { Injectable } from '@angular/core';
import { CustomUser} from '../models';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';


const AUTH_API = 'http://127.0.0.1:8000/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
}

@Injectable({
  providedIn: 'root'
})
export class AuthService { 

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<any>{
    return this.http.post(AUTH_API + 'users/login/', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, password2: string): Observable<any>{
    return this.http.post(AUTH_API + 'users/register/', {
      username,
      email,
      password,
      password2
    }, httpOptions);
  }


  
}
