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
    typeOfNoer: null, // anties || rejection || hater
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
    this.userConfigService.updateProfile = this.profile;
    this.router.navigate(['/choose-user-group']);
  }
  noerSelection(type) {
    switch (type) {
      case 'rejection':
        this.profile.typeOfNoer = 'rejection';
        break;
      case 'hater':
        this.profile.typeOfNoer = 'hater';
        break;
      default:
        this.profile.typeOfNoer = 'anties';
        break;
    }

  }


}
