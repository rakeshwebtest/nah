import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpClient } from '../utils';
import { UserConfigService } from '../utils/user-config.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController, AlertController } from '@ionic/angular';
import { LoadingService } from '../utils/loading.service';

@Component({
  selector: 'theapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  profile: any = {
    type_of_noer: null, // anties || rejection || hater
    country: null,
    followGroups:[],
    newGroupName:null
  };

  constructor(private router: Router, private http: AppHttpClient,
    private nativeStorage: NativeStorage,
    public loadingService: LoadingService,
    private alertController: AlertController,
    private userConfigService: UserConfigService) { }

  ngOnInit() {

  }
  onCreateGroup() {
    this.router.navigate(['/choose-user-group']);
  }
  noerSelection(type) {
    switch (type) {
      case 'rejection':
        this.profile.type_of_noer = 'rejection';
        break;
      case 'hater':
        this.profile.type_of_noer = 'hater';
        break;
      default:
        this.profile.type_of_noer = 'anties';
        break;
    }

  }
  async updateSignIn() {
    if (this.checkValidation()) {
      await this.loadingService.show();
      const { email, id } = this.userConfigService.user.user;
      this.profile.email = email;
      this.profile.id = id;
      this.http.put('user', this.profile).subscribe(res => {
        this.nativeStorage.getItem('google_user').then(user => {
          user.user.type_of_noer = this.profile.type_of_noer;
          user.user.country = this.profile.country;
          this.nativeStorage.setItem('google_user', user);
        });
        this.loadingService.hide();
        this.router.navigate(['/dashboard']);
      });
    }
  }
  checkValidation() {
    if (!this.profile.type_of_noer) {
      this.presentAlert('Chose Type of Noer');
      return false;
    }
    if (!this.profile.country) {
      this.presentAlert('Select Country');
      return false;
    }
    if(this.profile.followGroups !== 0){
      this.presentAlert('Select Groups or Create Group');
      return false;
    }

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
