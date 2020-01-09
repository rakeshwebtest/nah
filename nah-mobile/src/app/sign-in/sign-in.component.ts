import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppHttpClient } from '../utils';
import { UserConfigService } from '../utils/user-config.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { LoadingService } from '../utils/loading.service';

@Component({
  selector: 'theapp-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  cityList: any = [];
  profile: any = {
    typeOfNoer: null, // anties || rejection || hater
    cityId: null,
    followGroups: [],
    newGroupName: null
  };

  constructor(private router: Router, private http: AppHttpClient,
    public loadingService: LoadingService,
    private userConfigService: UserConfigService) { }

  ngOnInit() {
    this.getCities();

  }
  getCities() {
    this.http.get('city/list').subscribe(res => {
      this.cityList = res.data;
    });
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
