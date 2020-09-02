import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { Router, NavigationEnd } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { FcmProviderService } from './utils/fcm-provider.service';
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
    private router: Router,
    private ga: GoogleAnalytics,
    private fcmProviderService: FcmProviderService,
    private fcm: FCM
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.fcmProviderService.setToken(); // set token and on notifications

      this.ga.startTrackerWithId('UA-158946994-1')
        .then(() => {
          this.startTracking();
        }).catch(e => console.log('Error starting GoogleAnalytics == ' + e));

      // Here we will check if the user is already logged in
      // because we don't want to ask users to log in each time they open the app
      // this.nativeStorage.getItem('google_user')
      //   .then(data => {
      //     this.userConfigService.user = data;
      //     // user is previously logged and we have his data
      //     // we will let him access the app
      //     if (data.user.typeOfNoer) {
      //       this.router.navigate(['/dashboard']);
      //     } else {
      //       this.router.navigate(['/sign-in']);
      //     }
      //     this.splashScreen.hide();
      //   }, err => {
      //     // console.log('data', err);
      //     this.router.navigate(['/home']);
      //   });

      // this.authenticationService.ifLoggedIn();
      // this.authenticationService.authState.subscribe(state => {
      //   console.log('state', state);

      //   if (data.user.typeOfNoer) {
      //     this.router.navigate(['/dashboard']);
      //   } else {
      //     this.router.navigate(['/sign-in']);
      //   }
      //   if (state) {
      //     this.router.navigate(['dashboard']);
      //   } else {
      //     this.router.navigate(['home']);
      //   }
      // });
      this.splashScreen.hide();
      this.statusBar.styleDefault();
    });
  }
  startTracking() {
    /**
   
    this.router.events.subscribe(res => {
      if (res instanceof NavigationEnd) {
        this.ga.trackView(res.url)
          .then(() => { })
          .catch(e => console.log(e));
         // console.log('traking',res.url);
          this.ga.trackEvent('url', res.url);
        if (this.authenticationService.isAuthenticated()) {
          // console.log(this.authenticationService.getUserInfo());
          this.ga.trackEvent('user', JSON.stringify(this.authenticationService.getUserInfo()));
        } else {
          // this.ga.trackEvent('url', res.url);
        }

      }

    });
      * 
     */
  }
}
