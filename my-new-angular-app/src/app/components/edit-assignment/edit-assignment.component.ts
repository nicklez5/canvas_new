import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Assignment } from 'src/app/models';
@Component({
  selector: 'app-edit-assignment',
  templateUrl: './edit-assignment.component.html',
  styleUrls: ['./edit-assignment.component.css']
})
export class EditAssignmentComponent implements OnInit {
  assignmentForm: FormGroup;
  assignmentID: any;
  courseID: any;
  assignment: Assignment;
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
    this.assignmentID = this.actRoute.snapshot.paramMap.get('id2')
    this.assignmentForm = this.fb.group({
      name : [''],
      max_points: [''],
      student_points: [''],
      description: [''],
      file: [null]
    })
    this.authService.getAssignment(this.assignmentID).subscribe((res:Assignment) => {
      this.assignmentForm.setValue({
        name: res.name,
        max_points: res.max_points,
        student_points: res.student_points,
        description: res.description,
        file: res.file
    })
      console.log(res)
    })
    
  }

  ngOnInit(): void {
    
  }
  editAssignment(): void{
    this.assignment = {
      id: this.assignmentID,
      name: this.assignmentForm.get('name')!.value,
      student_points: this.assignmentForm.get('student_points')!.value,
      description: this.assignmentForm.get('description')!.value,
      date_created: this.date,
      max_points: this.assignmentForm.get('max_points')!.value,
      file: this.assignmentForm.get('file')!.value
    }
    this.authService.editAssignment(this.assignment,this.assignmentID).subscribe()
    this.router.navigate(['/course',this.courseID,'assignments'])
  }
  uploadFile(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList){
      console.log("FileUpload -> files", fileList)
    }
  }

}
