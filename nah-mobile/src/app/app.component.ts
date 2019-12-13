import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AppHttpClient } from './utils';
import { UserConfigService } from './utils/user-config.service';

@Component({
  selector: 'theapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home'
    }
  ];
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private nativeStorage: NativeStorage,
    private router: Router,
    private userConfigService: UserConfigService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      console.log('already');
      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      this.nativeStorage.getItem('google_user')
        .then(data => {
          this.userConfigService.user = data;
          // user is previously logged and we have his data
          // we will let him access the app
          if (data.user.typeOfNoer) {
            this.router.navigate(['/dashboard']);
          } else {
            this.router.navigate(['/sign-in']);
          }
          this.splashScreen.hide();
        }, err => {
          // console.log('data', err);
          this.router.navigate(['/home']);
          this.splashScreen.hide();
        });
      this.statusBar.styleDefault();
    });
  }
}
