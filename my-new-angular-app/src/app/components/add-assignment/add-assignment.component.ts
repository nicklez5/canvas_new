import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Assignment } from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css']
})
export class AddAssignmentComponent implements OnInit {
  courseID: any;
  assignmentForm: FormGroup;
  assignmentID: number;
  assignment: Assignment;
  errorMsg: any;
  date = new Date();
  fileToUpload: File | null = null;
  constructor(
    public fb: FormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) { 
    let id = this.actRoute.snapshot.paramMap.get('id')
    this.courseID = id;
    this.auth_service.getCourse(id!).subscribe(res => {
      console.log(res.assignments.length)
      this.assignmentID = res.assignments.length + 1
    })
    this.assignmentForm = this.fb.group({
      name: [''],
      max_points: [''],
      description: [''],
      file: [null]
    })
  }

  ngOnInit(): void {
  }
  addAssignment(): void{
    console.log("Adding Assignment")
    this.assignment = {
      id: this.assignmentID,
      name: this.assignmentForm.get('name')!.value,
      date_created : this.date,
      max_points: this.assignmentForm.get('max_points')!.value,
      student_points: 0,
      description: this.assignmentForm.get('description')!.value,
      file: this.assignmentForm.get('file')!.value
    }
    this.auth_service.addAssignment_Course(this.courseID,this.assignment).subscribe((res:any) => {
      this.router.navigate(['/course',this.courseID,'assignments'])
      
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


