import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private router: Router, private sessionService: SessionService) {
  }
  canLoad() {
    return this.checkLogin();
  }
  canActivate() {
    return this.checkLogin();
  }
  checkLogin() {
    if (this.sessionService.checkSession()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
