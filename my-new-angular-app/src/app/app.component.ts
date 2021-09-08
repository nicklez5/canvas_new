import { Component, OnInit } from '@angular/core';
import { AuthService } from '../app/_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title="my-new-angular-app"
  

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    
  }

  logout(): void {
    this.authService.doLogout()
  }
}
