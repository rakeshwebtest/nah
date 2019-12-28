import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable()
export class LoginGuard implements CanActivate, CanLoad {
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
            this.router.navigate(['/admin']);
            return false;
        } else {
            return true;
        }
    }
}
