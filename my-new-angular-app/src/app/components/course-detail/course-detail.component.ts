import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Assignment, Course, Profile, Lecture } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
declare function openNav(): void;
declare function closeNav(): void;
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})

export class CourseDetailComponent implements OnInit {
  currentCourse: Course;
  assignments: Assignment[] = [];
  profiles: Profile[] = [];
  lectures: Lecture[] = [];
  

  courseID: any;
  constructor(
    public auth_service: AuthService,
    private actRoute: ActivatedRoute
  ) { 
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.auth_service.getCourse(id!).subscribe(res => {
      for(let i = 0 ; i < res.assignments.length ; i++){
        var x = new Assignment()
        x.name = res.assignments[i].name
        x.date_created = res.assignments[i].date_created
        x.max_points = res.assignments[i].max_points
        x.student_points = res.assignments[i].student_points
        x.description = res.assignments[i].description
        x.id = res.assignments[i].id
        x.file = res.assignments[i].file
        this.assignments.push(x);
      }
      for(let i = 0 ; i < res.profiles.length ; i++){
        var y = new Profile()
        y.pk = res.profiles[i].pk
        y.email = res.profiles[i].email
        y.first_name = res.profiles[i].first_name
        y.last_name = res.profiles[i].last_name
        y.date_of_birth = res.profiles[i].date_of_birth
        this.profiles.push(y);
      }
      for(let i = 0 ; i < res.lectures.length ; i++){
        var z = new Lecture()
        z.pk = res.lectures[i].id
        z.description = res.lectures[i].description
        z.date_created = res.lectures[i].date_created
        z.name = res.lectures[i].name
        z.image = res.lectures[i].image
        this.lectures.push(z)
      }
      this.courseID = id;
      console.log("Entering Course Detail Component")
      this.currentCourse = {
        name: res.name,
        pk: res.pk,
        profiles: this.profiles,
        lectures: this.lectures,
        assignments: this.assignments 
      }
  })
  //console.log(this.currentCourse)

}

  ngOnInit(): void {
    
  }
  

}