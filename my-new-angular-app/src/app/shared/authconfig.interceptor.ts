import { Injectable } from '@angular/core';
import { HttpEvent, HTTP_INTERCEPTORS, HttpHandler, HttpRequest, HttpErrorResponse, HttpInterceptor } from '@angular/common/http';
import { catchError , filter, take , switchMap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { errorMonitor } from 'events';
import { AuthService } from '../_services/auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{

  constructor(private authService: AuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Interception in Progress");
    const token = this.authService.getToken();
    req = req.clone({ 
        setHeaders: {
            Authorization: 'Token ' + token 
        }
    });
    

    return next.handle(req);
  }
}
