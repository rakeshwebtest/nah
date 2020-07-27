import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    public authenticationService: AuthenticationService
  ) { }

  canActivate(): Promise<boolean> | boolean {
    const data = this.authenticationService.checkUser();
    return new Promise((resolve, reject) => {
      data.then(res => {
        if (res) {
          this.authenticationService.authState.next(res);
          resolve(true);
        } else {
          // this.router.parseUrl("/home");
          this.router.navigate(['/home']);
          resolve(false);
        }
      });
    });
    // return data.then(res => {
    //   if (res) {
    //     return true;
    //   }
    //   else {
    //     return this.router.parseUrl("/home");
    //   }
    // })
    // console.log('data --loing', data);
    // return (data) ? true : false;
  }

}