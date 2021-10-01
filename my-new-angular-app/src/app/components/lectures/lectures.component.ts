import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecture } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service'
@Component({
  selector: 'app-lectures',
  templateUrl: './lectures.component.html',
  styleUrls: ['./lectures.component.css']
})
export class LecturesComponent implements OnInit {
  headers = ['id', 'name', 'date_created', 'description', 'file', 'etc'] 
  lectures: Lecture[] = [];
  courseID: any;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router 
  ) {
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.authService.getCourse(this.courseID).subscribe(res => {
      for(let i = 0 ; i < res.lectures.length; i++){
        var y = new Lecture()
        y.id = res.lectures[i].id
        y.name = res.lectures[i].name
        y.description = res.lectures[i].description
        y.date_created = res.lectures[i].date_created
        y.file = res.lectures[i].file
        this.lectures.push(y)
      }
    })
  }

  ngOnInit(): void {
  }
  delete_me(x:any){
    this.authService.deleteLecture_Course(this.courseID, x.toString())
    this.router.navigate(['/course',this.courseID,'lectures'])
  }
  

}
