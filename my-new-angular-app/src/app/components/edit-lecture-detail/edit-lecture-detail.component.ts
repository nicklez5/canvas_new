import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Lecture } from 'src/app/models';
@Component({
  selector: 'app-edit-lecture-detail',
  templateUrl: './edit-lecture-detail.component.html',
  styleUrls: ['./edit-lecture-detail.component.css']
})
export class EditLectureDetailComponent implements OnInit {
  lectureForm: FormGroup;
  lectureID: any;
  courseID: any;
  lecture: Lecture;
  fileToUpload: File | null = null;
  errorMsg: any;
  date = new Date();
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public actRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.lectureID = this.actRoute.snapshot.paramMap.get('id2')
    this.lectureForm = this.fb.group({
      description: [''],
      name: [''],
      file: [null]
    })
    this.authService.getLecture(this.lectureID).subscribe((res:Lecture) => {
      console.log(res)
      this.lectureForm.setValue({
        name: res.name,
        description: res.description,
        file: res.file 
      })
    })
  }

  ngOnInit(): void {
  }
  editLecture(): void{
    this.lecture = {
      id: this.lectureID,
      description: this.lectureForm.get('description')!.value,
      date_created: this.date,
      name: this.lectureForm.get('name')!.value,
      file: this.lectureForm.get('file')!.value
    }
    this.authService.editLecture(this.lecture,this.lectureID).subscribe()
    this.router.navigate(['/course',this.lectureID,'lectures'])
  }
  uploadFile(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList){
      console.log("FileUpload -> files", fileList)
    }
  }
}
