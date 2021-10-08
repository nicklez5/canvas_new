import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Test } from 'src/app/models';
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
  date = new Date();
  fileToUpload: File | null = null;
  constructor(
    public fb: FormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router 
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.auth_service.getCourse(this.courseID!).subscribe(res => {
      this.testID = res.tests.length + 1
      console.log("This testID:" + this.testID)
    })
    this.testForm = this.fb.group({
      name: [''],
      description: [''],
      file: [null],
      max_points: ['']
    })
  }

  ngOnInit(): void {
  }
  addTest(): void {
    this.test = {
      id: this.testID,
      name: this.testForm.get('name')!.value,
      date_created: this.date,
      description: this.testForm.get('description')!.value,
      file: this.testForm.get('file')!.value,
      max_points: this.testForm.get('max_points')!.value,
      student_points: 0
    }
    this.auth_service.addTest_Course(this.test, this.courseID).subscribe({
      complete() {history.back()}
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
