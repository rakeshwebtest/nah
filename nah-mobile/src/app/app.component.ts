import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { Platform } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthenticationService } from './services/authentication.service';
import { GoogleAnalytics } from '@ionic-native/google-analytics/ngx';
import { Location } from "@angular/common";
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
    private location: Location,
    private authenticationService: AuthenticationService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {

      console.log('already');
      let trakerReady = false;
      this.ga.startTrackerWithId('222691743')
        .then(() => {
          trakerReady = true;
        }).catch(e => alert('Error starting GoogleAnalytics == ' + e));

      this.router.events.subscribe((val) => {
        let cRoute = 'home';
        if (this.location.path() != "") {
          cRoute = this.location.path();
        }
        
        console.log('cRoute', cRoute);
        if (trakerReady)
          this.ga.trackView(cRoute);

      });
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
}
