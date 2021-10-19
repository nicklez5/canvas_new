import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Assignment, Profile }  from 'src/app/models';
import { AuthService } from 'src/app/shared/auth.service';
@Component({
  selector: 'app-submit-assignment',
  templateUrl: './submit-assignment.component.html',
  styleUrls: ['./submit-assignment.component.css']
})
export class SubmitAssignmentComponent implements OnInit {
  courseID: any;
  assignmentForm: FormGroup;
  assignmentID: any;
  assignment: Assignment;
  current_profile: Profile;
  errorMsg: any;
  fileToUpload: File | null = null;
  constructor(
    public fb: FormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) { 
    let id = this.actRoute.snapshot.paramMap.get('id')
    let id2 = this.actRoute.snapshot.paramMap.get('id2')
    let profile_id = this.auth_service.getPk()
    this.auth_service.getUserProfile(profile_id!).subscribe(res => {
      this.current_profile.first_name = res.first_name
      this.current_profile.last_name = res.last_name
      this.current_profile.pk = res.pk
      this.current_profile.email = res.email
      this.current_profile.date_of_birth = res.date_of_birth
    })
    this.courseID = id;
    this.assignmentID = id2;
    this.auth_service.getAssignment(this.assignmentID).subscribe(res => {
      this.assignment.id = res.id
      this.assignment.description = res.description
      this.assignment.date_due = res.date_due
      this.assignment.name = res.name 
      this.assignment.file = res.file
      this.assignment.max_points = res.max_points
      this.assignment.student_points = res.student_points 
    })
    this.assignment.submitter = this.current_profile.first_name + " " + this.current_profile.last_name
    this.auth_service.getCourse(this.courseID!).subscribe( res => {
      this.assignmentID = res.assignments.length + 1 
    })
    this.assignmentForm = this.fb.group({
      file: [null]
    })
  }

  ngOnInit(): void {
  }
  addAssignment(): void{
    this.assignment.file = this.assignmentForm.get('file')!.value
    this.auth_service.addAssignment_Course(this.courseID,this.assignment).subscribe((res:any) => {
      this.router.navigate(['/course', this.courseID, 'assignments'])
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
