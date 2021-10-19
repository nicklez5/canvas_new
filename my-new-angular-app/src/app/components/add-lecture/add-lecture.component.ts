import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Lecture } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-add-lecture',
  templateUrl: './add-lecture.component.html',
  styleUrls: ['./add-lecture.component.css']
})
export class AddLectureComponent implements OnInit {
  courseID: any;
  lectureForm: FormGroup;
  lectureID: number;
  lecture: Lecture;
  errorMsg: any;
  fileToUpload: File | null = null;
  constructor(
    public fb: FormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.auth_service.getCourse(this.courseID!).subscribe(res => {
      this.lectureID = res.lectures.length + 1
    })
    this.lectureForm = this.fb.group({
      name: [''],
      description: [''],
      file: [null]
    })
  }

  ngOnInit(): void {
  }
  addLecture(): void{
    this.lecture = {
      id: this.lectureID,
      name: this.lectureForm.get('name')!.value,
      description: this.lectureForm.get('description')!.value,
      file: this.lectureForm.get('file')!.value 
    }
    this.auth_service.addLecture_Course(this.courseID, this.lecture).subscribe((res:any) => {
      console.log(res)
      this.router.navigate(['/course',this.courseID,'lectures'])
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
