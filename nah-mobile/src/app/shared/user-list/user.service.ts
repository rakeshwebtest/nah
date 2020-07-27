import { Injectable } from '@angular/core';
import { AppHttpClient } from 'src/app/utils';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: AppHttpClient) { }

  getUsers(payload: any) {
    return this.http.get('user/list', { params: payload });
  }
}
