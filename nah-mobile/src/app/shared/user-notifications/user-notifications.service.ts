import { Injectable } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationsService {

  constructor(private http: AppHttpClient) { }

  getNotification(payload: any) {
    return this.http.get('notifications', { params: payload });
  }

}
