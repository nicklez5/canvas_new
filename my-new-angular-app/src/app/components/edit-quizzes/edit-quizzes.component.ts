import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Test } from 'src/app/models';
@Component({
  selector: 'app-edit-quizzes',
  templateUrl: './edit-quizzes.component.html',
  styleUrls: ['./edit-quizzes.component.css']
})
export class EditQuizzesComponent implements OnInit {
  testForm: FormGroup;
  testID: any;
  courseID: any;
  test: Test;
  fileToUpload: File | null = null;
  errorMsg: any;
  
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public actRoute: ActivatedRoute,
    public router: Router 
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.testID = this.actRoute.snapshot.paramMap.get('id2')
    this.testForm = this.fb.group({
      name: [''],
      description: [''],
      max_points: [''],
      student_points: [''],
      date_due: [''],
      submitter: [''],
      file: [null]
    })
    this.authService.getTest(this.testID).subscribe((res:Test) => {
      this.testForm.setValue({
        name: res.name,
        max_points: res.max_points,
        student_points: res.student_points,
        date_due: res.date_due,
        description: res.description,
        submitter: res.submitter,
        file: res.file
    })

    })
  }

  ngOnInit(): void {
  }
  editTest(): void {
    this.test = {
      id: this.testID,
      description: this.testForm.get('description')!.value,
      date_due: this.testForm.get('date_due')!.value,
      name: this.testForm.get('name')!.value,
      student_points: this.testForm.get('student_points')!.value,
      max_points: this.testForm.get('max_points')!.value,
      file: this.testForm.get('file')!.value,
      submitter: this.testForm.get('submitter')!.value 
    }
    this.authService.editTest(this.test, this.testID).subscribe({
      complete() { history.back()}
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
