import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-user-profile-tab-list',
  templateUrl: './user-profile-tab-list.component.html',
  styleUrls: ['./user-profile-tab-list.component.scss'],
})
export class UserProfileTabListComponent implements OnInit {

  type: any;
  userId: any;
  otherProfile = false;
  constructor(private activeRouter: ActivatedRoute, private authS: AuthenticationService) { }

  ngOnInit() {
    const sessionUser = this.authS.getUserInfo();
    if (this.activeRouter.snapshot.parent.params.id == sessionUser.id) {
      this.otherProfile = true;
    }
    if (this.activeRouter.snapshot.params.type) {
      this.type = this.activeRouter.snapshot.params.type;
    }
    if (this.activeRouter.snapshot.parent.params.id) {
      this.userId = this.activeRouter.snapshot.parent.params.id;
    }
  }

}
