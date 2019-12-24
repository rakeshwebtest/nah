import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ToastController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';


@Injectable(
  {
    providedIn: 'root'
  }
)
export class AuthenticationService {

  authState = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private storage: Storage,
    private platform: Platform,
    public toastController: ToastController
  ) {
    this.platform.ready().then(() => {
      this.ifLoggedIn();
    });
  }

  ifLoggedIn() {
    this.storage.get('USER_INFO').then((response) => {
      if (response) {
        console.log('if log USER_INFO',response);
        this.authState.next(response);
        if (response.user.typeOfNoer) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['sign-in']);
        }
      }
    });
  }


  login(user) {
    this.storage.set('USER_INFO', user).then((response) => {
      if (response) {
        console.log('response');
        if (response.user.typeOfNoer) {
          this.router.navigate(['dashboard']);
        } else {
          this.router.navigate(['sign-in']);
        }
      }
      this.authState.next(user);
    });
  }

  logout() {
    this.storage.remove('USER_INFO').then(() => {
      this.router.navigate(['home']);
      this.authState.next(false);
    });
  }

  isAuthenticated() {
    return this.authState.value;
  }


}