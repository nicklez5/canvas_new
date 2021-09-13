import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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
  { path: 'profile/:id/edit', component: EditProfileDetailComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
