import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Course, Assignment, Canvas, Profile, CustomUser } from './models';
import { Lecture } from './lecture';

@Injectable({
    providedIn: 'root'
})

export class ApiService {
    private _url: string = "http://127.0.0.1:8000/users/";
    private _url2: string = "http://127.0.0.1:8000/lectures/";
    private _url3: string = "http://127.0.0.1:8000/courses/";
    private _url4: string = "http://127.0.0.1:8000/assignments/";
    private _url5: string = "http://127.0.0.1:8000/profiles/";
    private _url6: string = "http://127.0.0.1:8000/canvas/";

    constructor(private http: HttpClient) {}

    //====================Users==============================\\
    getUsers(): Observable<CustomUser[]>{
        return this.http.get<CustomUser[]>(this._url).pipe(catchError(this.errorHandler));
    }
    errorHandler(error: HttpErrorResponse){
        return throwError(error.message || "Server Error")
    }
    getUserDetail(pk:number): Observable<CustomUser[]>{
        return this.http.get<CustomUser[]>(this._url + "detail/" + pk + "/").pipe(catchError(this.errorHandler));
    }
    loginUser(empData: any): Observable<CustomUser[]>{
        return this.http.post<CustomUser[]>(this._url + "login/",empData).pipe(catchError(this.errorHandler));
    }
    changePassword(pk: number, empData: any): Observable<CustomUser[]>{
        return this.http.put<CustomUser[]>(this._url + "change_password/" + pk + "/",empData).pipe(catchError(this.errorHandler));
    }
    register(empData: any): Observable<CustomUser[]>{
        return this.http.post<CustomUser[]>(this._url + "register/",empData).pipe(catchError(this.errorHandler));
    }
    deleteUser(pk:number){
        return this.http.delete(this._url + "detail/" + pk + "/")
    }
    //====================Assignments===========================\\
    getAssignments(): Observable<Assignment[]>{
        return this.http.get<Assignment[]>(this._url4).pipe(catchError(this.errorHandler));
    }
    postAssignment(empData: any): Observable<Assignment[]>{
        return this.http.post<Assignment[]>(this._url4 + "post/", empData).pipe(catchError(this.errorHandler));   
    }
    getAssignmentDetail(pk:number): Observable<Assignment[]>{
        return this.http.get<Assignment[]>(this._url4 + "detail/" + pk + "/").pipe(catchError(this.errorHandler));
    }
    updateAssignment(pk: number, empData: any): Observable<Assignment[]>{
        return this.http.put<Assignment[]>(this._url4 + "update/" + pk + "/",empData).pipe(catchError(this.errorHandler));
    }
    deleteAssignment(pk: number){
        return this.http.delete(this._url4 + "delete/" + pk + "/").pipe(catchError(this.errorHandler));
    }

    //===================Lectures================================\\
    getLectures(): Observable<Lecture[]>{
        return this.http.get<Lecture[]>(this._url2).pipe(catchError(this.errorHandler));
    }
    postLecture(empData: any): Observable<Lecture[]>{
        return this.http.post<Lecture[]>(this._url2 + "post/",empData).pipe(catchError(this.errorHandler));
    }
    getLectureDetail(pk:number): Observable<Lecture[]>{
        return this.http.get<Lecture[]>(this._url2 + "detail/" + pk + "/").pipe(catchError(this.errorHandler));
    }
    updateLecture(pk: number, empData: any): Observable<Lecture[]>{
        return this.http.put<Lecture[]>(this._url2 + "update/" + pk + "/",empData).pipe(catchError(this.errorHandler));
    }
    deleteLecture(pk: number){
        return this.http.delete(this._url2 + "delete/" + pk + "/").pipe(catchError(this.errorHandler));
    }

    //=====================Courses================================\\
    getCourses(): Observable<Course[]>{
        return this.http.get<Course[]>(this._url3).pipe(catchError(this.errorHandler));
    }

    postCourse(empData: any): Observable<Course[]>{
        return this.http.post<Course[]>(this._url3 + "post/",empData).pipe(catchError(this.errorHandler));
    }

    getCourseDetail(pk: number): Observable<Course[]>{
        return this.http.get<Course[]>(this._url3 + "detail/" + pk + "/").pipe(catchError(this.errorHandler));
    }

    removeAssignmentFromCourse(pk: number, empData: any): Observable<Course[]>{
        return this.http.put<Course[]>(this._url3 + "remove_assignment/" + pk + "/",empData).pipe(catchError(this.errorHandler));
    }

    removeLectureFromCourse(pk: number, empData: any): Observable<Course[]>{
        return this.http.put<Course[]>(this._url3 + "remove_lecture/" + pk + "/",empData).pipe(catchError(this.errorHandler));
    }

    changeCourseNameFromCourse(pk: number,empData: any): Observable<Course[]>{
        return this.http.put<Course[]>(this._url3 + "change_course_name/" + pk + "/", empData).pipe(catchError(this.errorHandler));
    }

    addLectureFromCourse(pk: number, empData: any): Observable<Course[]>{
        return this.http.put<Course[]>(this._url3 + "add_lecture/" + pk + "/", empData).pipe(catchError(this.errorHandler));
    }

    addAssignmentFromCourse(pk: number, empData: any): Observable<Course[]>{
        return this.http.put<Course[]>(this._url3 + "add_assignment/" + pk + "/", empData).pipe(catchError(this.errorHandler));
    }

    addStudentFromCourse(pk: number, empData: any): Observable<Course[]>{
        return this.http.put<Course[]>(this._url3 + "add_student/" + pk + "/",empData).pipe(catchError(this.errorHandler));
    }

    removeStudentFromCourse(pk: number, empData: any): Observable<Course[]>{
        return this.http.put<Course[]>(this._url3 + "remove_student/" + pk + "/", empData).pipe(catchError(this.errorHandler));
    }

    //===============================Profiles==================================\\
    getProfiles(): Observable<Profile[]> {
        return this.http.get<Profile[]>(this._url5).pipe(catchError(this.errorHandler));
    }

    getProfileDetail(pk:number): Observable<Profile[]>{
        return this.http.get<Profile[]>(this._url5 + pk + "/").pipe(catchError(this.errorHandler));
    }

    ProfileUpdate(pk: number, empData: any): Observable<Profile[]>{
        return this.http.put<Profile[]>(this._url5 + "update/" + pk + "/",empData).pipe(catchError(this.errorHandler));
    }

    //===============================Canvas====================================\\
    getCanvas(): Observable<Canvas[]> {
        return this.http.get<Canvas[]>(this._url6).pipe(catchError(this.errorHandler));
    }
    getCanvasDetail(pk : number ): Observable<Canvas[]>{
        return this.http.get<Canvas[]>(this._url6 + "detail/" + pk + "/").pipe(catchError(this.errorHandler));
    }
    addCoursetoCanvas(pk : number, empData: any): Observable<Canvas[]>{
        return this.http.post<Canvas[]>(this._url6 + "courses/" + pk + "/",empData).pipe(catchError(this.errorHandler));
    }
    removeCoursefromCanvas(pk : number, empData: any): Observable<Canvas[]>{
        return this.http.put<Canvas[]>(this._url6 + "courses/" + pk + "/", empData).pipe(catchError(this.errorHandler));
    }

    updateCurrentCoursefromCanvas(pk: number, empData: any): Observable<Canvas[]>{
        return this.http.put<Canvas[]>(this._url6 + "course_detail/" + pk + "/", empData).pipe(catchError(this.errorHandler));
    }

    

}