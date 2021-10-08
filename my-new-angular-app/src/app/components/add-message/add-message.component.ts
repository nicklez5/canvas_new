import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/shared/auth.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Message, Profile, Thread } from 'src/app/models';
@Component({
  selector: 'app-add-message',
  templateUrl: './add-message.component.html',
  styleUrls: ['./add-message.component.css']
})
export class AddMessageComponent implements OnInit {
  courseID: any;
  threadID: string;
  errorMsg: any;
  thread = new Thread();
  messageForm: FormGroup;
  profile: Profile;
  profileID: any;
  message = new Message();
  messageID: number;
  date = new Date();
  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.courseID = this.actRoute.snapshot.paramMap.get('id')
    this.threadID = this.actRoute.snapshot.paramMap.get('id2')!
    this.messageID = 0
    this.authService.getCourse(this.courseID).subscribe(res => {
      for(let i = 0; i < res.threads.length;i++){
        for(let j = 0 ; j < res.threads[i].list_messages.length;j++){
          this.messageID = this.messageID + 1
        }
      }
    })
    this.profileID = this.authService.getPk();
    this.authService.getUserProfile(this.profileID).subscribe(res => {
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
    console.log("Message ID: " + this.messageID)
    console.log("Thread ID: " + this.threadID)
    this.authService.addMessage(this.message).subscribe()
    this.authService.updateMessageProfile(this.message,this.profile).subscribe()
    var y: number = +this.threadID
    this.authService.getThread(this.threadID).subscribe(res => { 
      this.thread.id = res.id
      this.thread.last_author = res.last_author
      this.thread.last_description = res.last_description
      this.thread.last_timestamp = res.last_timestamp
      this.thread.list_messages = res.last_messages 
    })
    //console.log(this.thread)
    this.authService.addMessageThread(this.thread,this.message,this.threadID).subscribe({
      complete() {history.back()}
    })
  }
}
