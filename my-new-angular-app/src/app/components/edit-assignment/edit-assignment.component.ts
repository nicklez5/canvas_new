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
      description: [''],
      file: [null]
    })
    this.authService.getAssignment(this.assignmentID).subscribe((res:Assignment) => {
      
    })
    
  }

  ngOnInit(): void {
    
  }
  editAssignment(): void{

  }
  uploadFile(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList){
      console.log("FileUpload -> files", fileList)
    }
  }

}
