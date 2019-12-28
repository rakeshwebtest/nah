import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/utils/loading.service';
import { UserConfigService } from 'src/app/utils/user-config.service';
import { AlertController, ModalController } from '@ionic/angular';
import { AppHttpClient } from 'src/app/utils';
import { Router } from '@angular/router';
import { GroupCreateModalComponent } from 'src/app/group-create-modal/group-create-modal.component';
import { Storage } from '@ionic/storage';
import { AuthenticationService } from 'src/app/services/authentication.service';
@Component({
  selector: 'theapp-choose-user-groups',
  templateUrl: './choose-user-groups.component.html',
  styleUrls: ['./choose-user-groups.component.scss']
})
export class ChooseUserGroupsComponent implements OnInit {
  groupList = [
  ];
  profile: any;
  userInfo: any;
  followingGroups:string[] = [];
  createdGroups:string[] = [];
  constructor(private router: Router, private loadingService: LoadingService,
    private alertController: AlertController,
    private http: AppHttpClient,
    private nativeStorage: Storage,
    public modalController: ModalController,
    private authService: AuthenticationService,
    private userConfigService: UserConfigService) { }

  ngOnInit() {
    this.userConfigService.user = <any>this.authService.isAuthenticated();
    this.userInfo = this.userConfigService.user.user;
    this.profile = this.userConfigService.updateProfile;
    this.profile.followGroups = [];
    this.getGroups();
  }
  getGroups() {
    this.http.get('group/list').subscribe(res => {
      console.log('list', res);
      this.groupList = res.data || [];
      this.profile.followGroups = this.groupList.filter(g=>g.createdBy === this.userInfo.id);
      console.log('this.profile.followGroups',this.profile.followGroups);
    });
  }
  async updateSignIn() {
    const { email, id } = this.userConfigService.user.user;
    this.profile.followGroups = this.groupList.filter(item => item.active).map(item => { return { userId: id, groupId: item.id } });
    console.log('this.profile.followGroups -->', this.profile.followGroups);

    if (this.checkValidation()) {
      await this.loadingService.show();

      this.profile.email = email;
      this.profile.id = id;
      this.http.put('user', this.profile).subscribe(res => {
        this.nativeStorage.get('USER_INFO').then(user => {
          user.user.typeOfNoer = this.profile.typeOfNoer;
          user.user.country = this.profile.country;
          this.nativeStorage.set('USER_INFO', user);
        });
        this.loadingService.hide();
        this.router.navigate(['/dashboard']);
      });
    }
  }
  itemClick(item) {
    item.active = !item.active;
    const { email, id } = this.userConfigService.user.user;
    this.profile.followGroups = this.groupList.filter(item => item.active || item.createdBy === this.userInfo.id).map(item => { return { userId: id, groupId: item.id } });
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

  async presentModal() {
    console.log('0k');
    const modal = await this.modalController.create({
      component: GroupCreateModalComponent,
      cssClass: "group-create-modal"
    });
    modal.onDidDismiss().then(arg=>{
      this.getGroups();
    });
    return await modal.present();
  }
}
