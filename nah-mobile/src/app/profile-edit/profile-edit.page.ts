import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.page.html',
  styleUrls: ['./profile-edit.page.scss'],
})
export class ProfileEditPage implements OnInit {
  profile: any = {};
  constructor(private nativeStorage: Storage,private router:Router) { }

  ngOnInit() {

    this.nativeStorage.get('USER_INFO').then(res => {
      const user = res.user;
      // if (user.typeOfNoer)
      //   this.profile.typeOfNoer = user.typeOfNoer;
      // if (user.city && user.city.id)
      //   this.profile.cityId = user.typeOfNoer;
      this.profile = user;
    })
  }
  updatedProfile(event){

    this.nativeStorage.get('USER_INFO').then(res => {
      res.user = event;
      this.nativeStorage.set('USER_INFO', res);
      this.router.navigate(['/user-profile']);
    })

  }

}
