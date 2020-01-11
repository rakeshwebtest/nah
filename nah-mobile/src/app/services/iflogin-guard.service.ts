import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class IfLoginGuard implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(): boolean {
    const _user: any = this.authenticationService.isAuthenticated();
    if(_user){
      if (_user.user.typeOfNoer) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/sign-in']);
      }
      return false;
    }else{

      return true;
    }
  
  }

}