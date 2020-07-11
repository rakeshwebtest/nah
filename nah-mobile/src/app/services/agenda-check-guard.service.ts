import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AgendaService } from '../agenda/agenda.service';
import { Route } from '@angular/compiler/src/core';

@Injectable({
  providedIn: 'root'
})
export class AgendaCheckGuardService implements CanActivate {

  constructor(private agendaS: AgendaService, private router: Router) { }
  canActivate(): Promise<boolean> | boolean {
    return new Promise((resolve, reject) => {
      this.agendaS.promiseCheckAgenda().then(res => {
        if (res) {
          resolve(true);
        } else {
          resolve(false);
          this.router.navigate(['/agenda/create'], { queryParams: { redirectUrl: 'post' } });
        }
      });
    });
  }
}
