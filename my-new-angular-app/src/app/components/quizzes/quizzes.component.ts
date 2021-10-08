import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-quizzes',
  templateUrl: './quizzes.component.html',
  styleUrls: ['./quizzes.component.css']
})
export class QuizzesComponent implements OnInit {
  headers = ['id','name','date_created','description','max_points','student_points','file']
  tests: Test[] = [];
  courseID: any;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.authService.getCourse(this.courseID).subscribe(res => {
      for(let i = 0; i < res.tests.length; i++){
        var y = new Test()
        y.id = res.tests[i].id
        y.name = res.tests[i].name
        y.date_created = res.tests[i].date_created
        y.description = res.tests[i].description
        y.max_points = res.tests[i].max_points
        y.student_points = res.tests[i].student_points
        y.file = res.tests[i].file
        this.tests.push(y)
      }
    })
  }

  ngOnInit(): void {
  }
  delete_me(x:any){
    this.authService.removeTest(x.toString()).subscribe({
      complete() {window.location.reload()}
    })
  }
  

}
