import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap} from '@angular/router';
import { Profile } from 'src/app/models';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent implements OnInit {
  studentForm: FormGroup;
  profileID: any;
  profile: Profile;
  courseID: any;
  errorMsg: any;
  constructor(
    public fb: FormBuilder, 
    public authService: AuthService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.studentForm = this.fb.group({
      first_name: [''],
      last_name: [''],
      email: [''],
      date_of_birth: ['']
    })
    this.courseID = this.actRoute.snapshot.paramMap.get('id')

  }

  ngOnInit(): void {
  }
  addStudent(): void{
    this.authService.addStudent_Course(
    this.studentForm.get('first_name')!.value,
    this.studentForm.get('last_name')!.value,
    this.studentForm.get('email')!.value,
    this.studentForm.get('date_of_birth')!.value,
    this.courseID).subscribe({
      complete() { history.back()}
    }) 
  }

}
