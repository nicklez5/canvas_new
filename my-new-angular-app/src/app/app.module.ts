import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SigninComponent } from './components/signin/signin.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthInterceptor } from './shared/authconfig.interceptor'
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { EditProfileDetailComponent } from './components/edit-profile-detail/edit-profile-detail.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AddLectureComponent } from './components/add-lecture/add-lecture.component';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { Home2Component } from './components/home2/home2.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SigninComponent,
    RegisterComponent,
    ProfileDetailComponent,
    EditProfileDetailComponent,
    AddCourseComponent,
    AddLectureComponent,
    AddAssignmentComponent,
    CourseDetailComponent,
    Home2Component,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
