import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Profile } from 'src/app/models';
import { AuthService } from './../../_services/auth.service';
@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {
  currentUser: Profile;
  constructor(
    public authService: AuthService,
    private actRoute: ActivatedRoute
  ) {
    let pk = this.actRoute.snapshot.paramMap.get('pk');
    this.authService.getUserProfile(pk).subscribe(res => {
      this.currentUser = res.msg;
    })
  }

  ngOnInit(): void {
  }

}
