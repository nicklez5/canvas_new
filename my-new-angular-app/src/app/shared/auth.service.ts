import { Injectable } from '@angular/core';
import { Assignment, Canvas, Course, CustomUser, Profile } from '../models';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endpoint: string = 'http://127.0.0.1:8000';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {}
  constructor(
    private http: HttpClient,
    public router: Router 
  ) {

  }
  getCurrentProfileID(){
    return this.currentUser
  }
  signUp(username: string, email: string, password: string, password2: string): Observable<any>{
    let api = `${this.endpoint}/users/register/`;
    return this.http.post(api,{
      username,
      email,
      password,
      password2
    }).pipe(
        catchError(this.handleError)
    )
  }

  signIn(email: string, password: string){
    return this.http.post<any>(`${this.endpoint}/users/login/`,{email,password})
      .subscribe((res: any) => {
        console.log(res.token)
        localStorage.setItem('user_id', res.user_id)
        localStorage.setItem('access_token', res.token)
        localStorage.setItem('email', res.email)
        localStorage.setItem('staff', res.staff)
        this.getUserProfile(res.user_id).subscribe((res: { pk?: any; email?: any }) => {
          this.currentUser = res;
          console.log(this.currentUser)
          this.router.navigate(['home']);
        })
      })
  }

  getPk(){
    return localStorage.getItem('user_id');
  }
  getToken(){
    return localStorage.getItem('access_token');
  }
  getEmail(){
    return localStorage.getItem('email');
  }
  get isStaff(): boolean{
    let authStaff = localStorage.getItem('staff');
    return (authStaff == 'true') ? true: false; 
  }

  get isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  doLogout(){
    let removeToken = localStorage.removeItem('access_token');
    if (removeToken == null){
      this.router.navigate(['signin']);
    }
  }

  getUserProfile(id: string): Observable<any>{
    let api = `${this.endpoint}/profiles/${id}/`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  editUserProfile(profile2: Profile, id: string): Observable<any> {
    console.log("Editting User Profile");
    console.log(JSON.stringify(profile2));
    let api = `${this.endpoint}/profiles/update/${id}/`;

    return this.http.put<any>(api, JSON.stringify(profile2), {headers : this.headers} ).pipe(
      map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
    );
  }
  getCanvas(id: string){
    let api = `${this.endpoint}/canvas/detail/${id}/`;
    return this.http.get<Canvas>(api).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
  postCourse(course: Course){
    let api = `${this.endpoint}/courses/post/`;
    return this.http.post<Course>(api, course, {headers : this.headers}).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
  addCourse_Canvas(course: Course, canvasID: any){
    let api = `${this.endpoint}/canvas/add_course/${canvasID}/`;
    return this.http.put(api, JSON.stringify(course) , { headers: this.headers}).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
  deleteMyself_Course(profile_: Profile, courseID: any){
    let api = `${this.endpoint}/courses/remove_student/${courseID}/`;
    return this.http.put(api, JSON.stringify(profile_), { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
  addMyself_Course(profile_: Profile, courseID: any ){
    let api = `${this.endpoint}/courses/add_student/${courseID}/`;
    return this.http.put(api, JSON.stringify(profile_), { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
  getCourse(id: string){
    let api = `${this.endpoint}/courses/detail/${id}/`;
    return this.http.get<Course>(api).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }
  getAssignment(id: string){
    let api = `${this.endpoint}/assignments/detail/${id}/`;
    return this.http.get<Assignment>(api).pipe(
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
    }else{
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
  addAssignment(assignment: Assignment){
    console.log(assignment);
    let api = `${this.endpoint}/assignments/post/`;
    return this.http.post<any>(api, JSON.stringify(assignment),{headers: this.headers})
  }
  
  addAssignment_Course(courseID: number, assignment: Assignment){
    this.addAssignment(assignment).subscribe((res:any) => {
      console.log(res)
    })
    let api = `${this.endpoint}/courses/add_assignment/${courseID}/`;
    return this.http.put<any>(api, assignment,{ headers: this.headers }).pipe(
      map((res:any) => {
        return res || {}
      }),
      catchError(this.handleError)
    );
  }
  deleteAssignment(assignment_pk: string){
    let api = `${this.endpoint}/assignments/delete/${assignment_pk}/`
    return this.http.delete<any>(api, {headers: this.headers })
  }
  deleteAssignment_Course(courseID: number, assignment_pk: string){
    this.deleteAssignment(assignment_pk).subscribe((res:any) => {
      console.log(res); 
    })
    let api = `${this.endpoint}/courses/remove_assignment/${courseID}/`;
    this.getAssignment(assignment_pk).subscribe((res:any) =>{
      return this.http.delete<any>(api, res)
    })    
  }
  delete_Course(pk : string){
    let api = `${this.endpoint}/courses/delete/${pk}/`
    return this.http.delete<any>(api, {headers: this.headers})
  }
  
}
