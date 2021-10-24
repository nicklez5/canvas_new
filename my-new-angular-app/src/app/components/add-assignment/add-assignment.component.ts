import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Assignment, Profile } from 'src/app/models';
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
  assignmentID_str: string; 
  assignment = new Assignment;
  current_profile = new Profile;
  profile_string: string 
  errorMsg: any;
  fileToUpload: File | null = null;
  constructor(
    public fb: FormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router
  ) { 
    this.assignmentForm = this.fb.group({
      name: [''],
      max_points: [''],
      description: [''],
      date_due: [''],
      submitter: [this.profile_string],
      file: [null]
    })
  }

  ngOnInit(): void {
    let id = this.actRoute.snapshot.paramMap.get('id')
    let profile_id = this.auth_service.getPk()
    
    this.auth_service.getUserProfile(profile_id!).subscribe(res => {
      this.current_profile = {
        first_name: res.first_name,
        last_name: res.last_name,
        pk: res.pk,
        email: res.email,
        date_of_birth: res.date_of_birth 
      }
      this.profile_string = this.current_profile.first_name + " " + this.current_profile.last_name 
      
      this.courseID = id;
      this.auth_service.getCourse(id!).subscribe(res => {
        console.log(res.assignments.length)
        this.assignmentID = res.assignments.length + 1
      })
      this.assignmentForm = this.fb.group({
        name: [''],
        max_points: [''],
        description: [''],
        date_due: [''],
        submitter: [this.profile_string],
        file: [null]
      })
      
    })
    
    
    
  }
  addAssignment(): void{
    let id1 = this.actRoute.snapshot.paramMap.get('id')
    console.log("Adding Assignment")
    this.auth_service.getCourse(id1!).subscribe(res => {
      console.log(res.assignments.length)
      this.assignmentID = res.assignments.length + 1
      this.assignment = {
        id: this.assignmentID,
        name: this.assignmentForm.get('name')!.value,
        date_due : this.assignmentForm.get('date_due')!.value,
        max_points: this.assignmentForm.get('max_points')!.value,
        student_points: 0,
        description: this.assignmentForm.get('description')!.value,
        file: this.assignmentForm.get('file')!.value,
        submitter: this.assignmentForm.get('submitter')!.value 
      }
      this.auth_service.addAssignment_Course(this.courseID,this.assignment).subscribe((res:any) => {
        console.log(res)
        this.assignmentID_str = this.assignmentID.toString()
        if(this.fileToUpload){
          this.auth_service.addAssignment_File(this.assignmentID_str,this.fileToUpload)
        }
        this.router.navigate(['/course',this.courseID,'assignments'])
      })
    })
    
    
  }
  uploadFile(event: Event){
    const element = event.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;
    if(fileList){
      console.log("FileUpload -> files", fileList[0].name)
      this.fileToUpload = fileList[0]

    }
  }
  
}


