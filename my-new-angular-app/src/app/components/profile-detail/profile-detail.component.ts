import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models';
import { AuthService } from './../../shared/auth.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  currentUser: Profile;
  profileID: any;
  constructor(
    public auth_service: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let id = this.actRoute.snapshot.paramMap.get('id');
    this.auth_service.getUserProfile(id!).subscribe(res => {
      this.profileID = id;
      console.log("Entering Profile Detail Component")
      this.currentUser = {
        pk: res.pk,
        first_name: res.first_name,
        email: res.email,
        last_name: res.last_name,
        date_of_birth: res.date_of_birth
      }
      

    })
  }
  ngOnInit(){}



}
