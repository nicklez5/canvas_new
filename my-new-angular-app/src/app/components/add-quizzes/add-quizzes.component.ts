import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Test, Profile } from 'src/app/models';
@Component({
  selector: 'app-add-quizzes',
  templateUrl: './add-quizzes.component.html',
  styleUrls: ['./add-quizzes.component.css']
})
export class AddQuizzesComponent implements OnInit {
  courseID: any;
  testForm: FormGroup;
  testID: number;
  test: Test;
  errorMsg: any;
  current_profile = new Profile;
  profile_string: string
  fileToUpload: File | null = null;
  constructor(
    public fb: FormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router 
  ) {
    this.testForm = this.fb.group({
      name: [''],
      description: [''],
      date_due: [''],
      file: [null],
      max_points: [''],
      submitter: ['']
    })
  
  }

  ngOnInit(): void {
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    let profile_id = this.auth_service.getPk()
    this.auth_service.getUserProfile(profile_id!).subscribe( res => {
      this.current_profile.first_name = res.first_name 
      this.current_profile.last_name = res.last_name
      this.current_profile.pk = res.pk
      this.current_profile.email = res.email
      this.current_profile.date_of_birth = res.date_of_birth

      this.profile_string = this.current_profile.first_name + " " + this.current_profile.last_name
      this.auth_service.getCourse(this.courseID).subscribe(res => {
        console.log(res.tests.length)
        this.testID = res.tests.length + 1
      })
      this.testForm = this.fb.group({
        name: [''],
        description: [''],
        date_due: [''],
        file: [null],
        max_points: [''],
        submitter: [this.profile_string]
      })
    })
    
  }
  addTest(): void {

    this.auth_service.getCourse(this.courseID!).subscribe(res => {
      this.testID = res.tests.length + 1
      console.log("This testID:" + this.testID)
      this.test = {
        id: this.testID,
        name: this.testForm.get('name')!.value,
        date_due: this.testForm.get('date_due')!.value,
        description: this.testForm.get('description')!.value,
        file: this.testForm.get('file')!.value,
        max_points: this.testForm.get('max_points')!.value,
        student_points: 0,
        submitter: this.testForm.get('submitter')!.value 
      }
      this.auth_service.addTest_Course(this.courseID,this.test).subscribe((res:any) =>{
        this.router.navigate(['/course',this.courseID,'quizzes'])
      })
    })
    
  }

  uploadFile(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList){
      console.log("FileUpload -> files", fileList)
    }
  }
}
