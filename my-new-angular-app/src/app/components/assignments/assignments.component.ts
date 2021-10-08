import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  headers = ["id", "name", "date_created", "max_points","student_points","description","file","etc"]
  assignments: Assignment[] = [];
  dictionary = {};
  courseID: any;
  constructor(
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    let id = this.actRoute.snapshot.paramMap.get('id')
    this.courseID = id;
    this.auth_service.getCourse(id!).subscribe(res => {
      for(let i = 0; i < res.assignments.length; i++){
        var x = new Assignment()
        x.name = res.assignments[i].name
        x.date_created = res.assignments[i].date_created
        x.max_points = res.assignments[i].max_points
        if(!res.assignments[i].student_points){
          x.student_points = 0
        }else{
          x.student_points = res.assignments[i].student_points
        }
        x.description = res.assignments[i].description
        x.id = res.assignments[i].id
        x.file = res.assignments[i].file
        this.assignments.push(x);
      }
    }) 
      console.log(this.assignments)
      
  }


  

  ngOnInit(): void {
  }
  delete_me(x: any){
    this.auth_service.deleteAssignment(x.toString()).subscribe({
      complete() {window.location.reload()}
    })
    
  }
  edit_me(x: any){
    
  }
}
