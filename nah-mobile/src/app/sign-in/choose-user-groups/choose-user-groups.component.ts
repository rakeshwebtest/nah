import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/utils/loading.service';
import { UserConfigService } from 'src/app/utils/user-config.service';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AppHttpClient } from 'src/app/utils';
import { Router } from '@angular/router';
import { SignInComponent } from '../sign-in.component';

@Component({
  selector: 'theapp-choose-user-groups',
  templateUrl: './choose-user-groups.component.html',
  styleUrls: ['./choose-user-groups.component.scss']
})
export class ChooseUserGroupsComponent implements OnInit {
  groupList = [
    { name: "Hate USA" },
    { name: "Noea of Newyeark" },
    { name: "Hte Modie" },
    { name: "Testing Neo" },
    { name: "Leon of the hearter" },
    { name: "Chek chak aldn" },
    { name: "fa sjlfsd fsajdf" },
    { name: "laldfk asdflsdafsdafl" },

  ];
  profile: any;
  constructor(private router: Router, private loadingService: LoadingService,
    private alertController: AlertController,
    private http: AppHttpClient,
    private nativeStorage: NativeStorage,
    private userConfigService: UserConfigService) { }

  ngOnInit() {
    this.profile = this.userConfigService.updateProfile;
    this.getGroups();
  }
  getGroups() {
    this.http.get('group/list').subscribe(res => {
      console.log('list', res);
      this.groupList = res.data || [];
    });
  }
  async updateSignIn() {
    if (this.checkValidation()) {
      await this.loadingService.show();
      const { email, id } = this.userConfigService.user.user;
      this.profile.email = email;
      this.profile.id = id;
      this.http.put('user', this.profile).subscribe(res => {
        this.nativeStorage.getItem('google_user').then(user => {
          user.user.typeOfNoer = this.profile.typeOfNoer;
          user.user.country = this.profile.country;
          this.nativeStorage.setItem('google_user', user);
        });
        this.loadingService.hide();
        // this.router.navigate(['/dashboard']);
      });
    }
  }
  itemClick(item) {
    item.active =! item.active;

  }
  checkValidation() {
    if (!this.profile.typeOfNoer) {
      this.presentAlert('Chose Type of Noer');
      return false;
    }
    if (!this.profile.country) {
      this.presentAlert('Select Country');
      return false;
    }
    // if (this.profile.followGroups !== 0) {
    //   this.presentAlert('Select Groups or Create Group');
    //   return false;
    // }

    return true;
  }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }
}
