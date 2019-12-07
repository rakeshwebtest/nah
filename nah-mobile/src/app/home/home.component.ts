import { Component, OnInit } from "@angular/core";
import { LoadingController, AlertController, Platform } from '@ionic/angular';
import { AuthService } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from "angularx-social-login";
import { AppHttpClient } from '@theapp/utils';
import { Route, Router } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Component({
  selector: 'theapp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  login = {};
  submitted = false;
  user: SocialUser;
  slideOpts = {

  };
  constructor(
    private authService: AuthService,
    private http: AppHttpClient,
    private router: Router,
    private googlePlus: GooglePlus,
    private nativeStorage: NativeStorage,
    public loadingController: LoadingController,
    private platform: Platform,
    public alertController: AlertController
  ) { }

  test(response) {
    this.http.get('user').subscribe(res => {
      console.log('res', res);
    });
    this.http.post('user', { test: "test", test2: "ts" }).subscribe(res => {
      console.log('res', res);
    });
  }
  // login callback
  loginCallback(response) {

    if (response.status === "PARTIALLY_AUTHENTICATED") {
      var code = response.code;
      var csrf = response.state;
      this.http.post('user', response).subscribe(res => {
        console.log('res', res);
      });
      // Send code to server to exchange for access token
    } else if (response.status === "NOT_AUTHENTICATED") {
      // handle authentication failure
    } else if (response.status === "BAD_PARAMS") {
      // handle bad parameters
    }
  }



  onLogin(form) {
    this.submitted = true;

    if (form.valid) {
      // this.navCtrl.setRoot(TabsPage);
    }
  }

  signInWithGoogle(): void {
    this.router.navigate(['/sign-in']);
    // this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then((user) => {
    //   delete user.id;
    //   this.http.post('user/login', user).subscribe(res => {
    //     console.log('ressss', res);
    //     this.router.navigate(['/sign-in']);
    //   });
    //   // this.navCtrl.setRoot(TabsPage);
    // });
  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }

  async doGoogleLogin() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    this.presentLoading(loading);
    this.googlePlus.login({
      'scopes': '', // optional - space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'offline': true, // Optional, but requires the webClientId - if set to true the plugin will also return a serverAuthCode, which can be used to grant offline access to a non-Google server
    })
      .then(user => {
        //save user data on the native storage
        this.nativeStorage.setItem('google_user', {
          name: user.displayName,
          email: user.email,
          picture: user.imageUrl
        })
          .then(() => {
            this.router.navigate(["/user"]);
          }, (error) => {
            console.log(error);
          })
        loading.dismiss();
      }, err => {
        console.log(err);
        if (!this.platform.is('cordova')) {
          this.presentAlert();
        }
        loading.dismiss();
      })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      message: 'Cordova is not available on desktop. Please try this in a real device or in an emulator.',
      buttons: ['OK']
    });

    await alert.present();
  }


  async presentLoading(loading) {
    return await loading.present();
  }

}
