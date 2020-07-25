import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingController, AlertController, Platform, IonRouterOutlet } from '@ionic/angular';
import { AppHttpClient } from './../utils';
import { Route, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { UserConfigService } from '../utils/user-config.service';
import { AuthenticationService } from '../services/authentication.service';
// import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { MessagingService } from '../utils/messaging.service';

@Component({
  selector: 'theapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  submitted = false;
  slideOpts = {

  };
  @ViewChild(IonRouterOutlet, null) routerOutlet: IonRouterOutlet;
  constructor(
    private http: AppHttpClient,
    private router: Router,
    private googlePlus: GooglePlus,
    private authenticationService: AuthenticationService,
    public loadingController: LoadingController,
    private platform: Platform,
    public alertController: AlertController,
    private userConfigService: UserConfigService,
    private fcmService: MessagingService

  ) {
    //     private fireAuth: AngularFireAuth
  }

  signInWithGoogleTest(): void {
    const user = { email: 'rakesh.webtest@gmail.com' };
    this.login(user);
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
    //   delete user.id;
    //   this.http.post('user/login', user).subscribe(res => {
    //     console.log('ressss', res);
    //     this.router.navigate(['/sign-in']);
    //   });
    //   // this.navCtrl.setRoot(TabsPage);
    // });
  }


  signOut(): void {
    // this.authService.signOut();
  }

  async signInWithGoogle() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    let params;
    console.log('this.platform', this.platform.is('cordova'));
    if (this.platform.is('android')) {
      params = {
        webClientId: '196016802810-lnb3pk45vliiddoqokmgd7jfk33mb36c.apps.googleusercontent.com',
        offline: true
      };
    } else if (this.platform.is('cordova')) {
      params = {
        webClientId: '196016802810-lnb3pk45vliiddoqokmgd7jfk33mb36c.apps.googleusercontent.com',
        offline: true
      };
    }



    this.googlePlus.login(params).then(user => {
      this.login(user);
      const { idToken, accessToken } = user;
      this.onLoginSuccess(idToken, accessToken);
      loading.dismiss();
    }, err => {
      console.log(err);
      if (!this.platform.is('cordova')) {
        this.presentAlert();
      }
      loading.dismiss();
    });
  }
  async login(user) {
    if (this.fcmService.fcmToken) {
      user.fcmToken = this.fcmService.fcmToken;
    }
    console.log('user',user);
    this.http.post('user/login', user).subscribe(res => {
      if (res.success) {
        const _resUser: any = res.data;
        this.userConfigService.user = _resUser;
        console.log('_resUser', _resUser);
        // save user data on the native storage
        this.authenticationService.login(_resUser);
      }
    });
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
      buttons: ['OK']
    });

    await alert.present();
  }

  onLoginSuccess(accessToken, accessSecret) {
    // const credential = accessSecret ? firebase.auth.GoogleAuthProvider
    //   .credential(accessToken, accessSecret) : firebase.auth.GoogleAuthProvider
    //     .credential(accessToken);
    // this.fireAuth.signInWithCredential(credential)
    //   .then((response) => {

    //   });

  }


  async presentLoading(loading) {
    return await loading.present();
  }

}
