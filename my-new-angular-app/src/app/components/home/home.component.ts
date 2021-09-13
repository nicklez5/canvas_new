import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/auth.service';
import { Canvas } from 'src/app/models';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  res : {};
  canvas: Canvas;
  profileID: any;
  constructor(private authService: AuthService) {
    this.profileID = this.authService.getPk();
  }

  ngOnInit(): void {
    console.log("Calling Get Canvas")
    this.authService.getCanvas(this.profileID).subscribe((data) => {
      console.log(data)
      this.canvas.pk = data.pk,
      this.canvas.current_course = data.current_course,
      this.canvas.list_courses = data.list_courses
    });
    //console.log(this.canvas.pk)
    //console.log(this.canvas)
  }

}
