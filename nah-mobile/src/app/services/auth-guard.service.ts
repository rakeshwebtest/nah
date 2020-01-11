import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    public authenticationService: AuthenticationService
  ) { }

  canActivate(): boolean {
    const data = this.authenticationService.isAuthenticated();
    console.log('data --loing',data);
    return (data) ? true : false;
  }

}