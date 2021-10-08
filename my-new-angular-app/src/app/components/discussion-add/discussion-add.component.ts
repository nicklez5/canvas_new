import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Message, Profile,Thread } from 'src/app/models';
@Component({
  selector: 'app-discussion-add',
  templateUrl: './discussion-add.component.html',
  styleUrls: ['./discussion-add.component.css']
})
export class DiscussionAddComponent implements OnInit {
  courseID: any;
  messageForm: FormGroup;
  messageID: number;
  threadID: number;
  thread: Thread;
  profile: Profile;
  profileID: any;
  message: Message;
  messages: Message[] = [];
  date = new Date();
  constructor(
    public fb: FormBuilder,
    public auth_service: AuthService,
    private actRoute: ActivatedRoute,
    public router: Router 
  ) {
    this.threadID = 0
    this.messageID = 0 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.auth_service.getCourse(this.courseID).subscribe(res => {
      
      for(let i = 0; i < res.threads.length; i++){
        for(let j = 0; j < res.threads[i].list_messages.length; j++){
          this.messageID = this.messageID + 1
        }
        this.threadID = this.threadID + 1 
      }
    })
    this.profileID = this.auth_service.getPk();
    this.auth_service.getUserProfile(this.profileID).subscribe(res => {
      this.profile = {
        pk : res.pk,
        email: res.email,
        first_name: res.first_name,
        last_name: res.last_name,
        date_of_birth: res.date_of_birth
      }
    })
    this.messageForm = this.fb.group({
      description: ['']
    })
  }

  ngOnInit(): void {
  }
  addMessage(): void{
    
    this.message = {
      id: this.messageID,
      author: this.profile,
      description: this.messageForm.get('description')!.value,
      timestamp: this.date
    }
    this.auth_service.addMessage(this.message).subscribe()
    this.auth_service.updateMessageProfile(this.message, this.profile).subscribe( res => {
      console.log(res) 
    })
    
    
    this.thread = {
      id: this.threadID,
      list_messages: this.messages,
      last_author: this.profile,
      last_description: this.messageForm.get('description')!.value,
      last_timestamp: this.date
    }
    
    //console.log(this.thread)
    //console.log(this.courseID)
    this.auth_service.addThread(this.thread).subscribe()
    this.auth_service.updateThreadProfile(this.thread, this.profile).subscribe()
    this.auth_service.addMessageThread(this.thread, this.message,this.threadID.toString()).subscribe(res => {
      console.log(res)
    })
    this.auth_service.addThread_Course(this.thread, this.courseID).subscribe({
      complete() {history.back()}
    })
  }
}
