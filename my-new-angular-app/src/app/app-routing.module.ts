import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAssignmentComponent } from './components/add-assignment/add-assignment.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { AssignmentsComponent } from './components/assignments/assignments.component';
import { CourseDetailComponent } from './components/course-detail/course-detail.component';
import { EditAssignmentComponent } from './components/edit-assignment/edit-assignment.component';
import { EditProfileDetailComponent } from './components/edit-profile-detail/edit-profile-detail.component';
import { HomeComponent } from './components/home/home.component';
import { Home2Component } from './components/home2/home2.component';
import { ProfileDetailComponent } from './components/profile-detail/profile-detail.component';
import { RegisterComponent } from './components/register/register.component';
import { SigninComponent } from './components/signin/signin.component'
import { AuthGuard} from "./shared/auth.guard";
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin'},
  { path: 'signin', component: SigninComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home2', component: Home2Component },
  { path: 'register', component: RegisterComponent },
  { path: 'profile/:id', component: ProfileDetailComponent, canActivate: [AuthGuard] },
  { path: 'profile/:id/edit', component: EditProfileDetailComponent, canActivate: [AuthGuard] },
  { path: 'course/add', component: AddCourseComponent, canActivate: [AuthGuard] },
  { path: 'course/:id', component: CourseDetailComponent, canActivate: [AuthGuard] },
  { path: 'course/:id/assignments', component: AssignmentsComponent, canActivate: [AuthGuard] },
  { path: 'course/:id/assignments/add', component: AddAssignmentComponent, canActivate: [AuthGuard] },
  { path: 'course/:id/assignments/:id2/edit',component: EditAssignmentComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
