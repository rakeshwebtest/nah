import { Injectable } from '@angular/core';
export interface UserConfig {
  user: {
    email: string;
    country: string;
    type_of_noer: string;
    id: number;
    displayName: string;
    imageUrl: string;
    userId: string;
  };
  token: string;
};
@Injectable({
  providedIn: 'root'
})
export class UserConfigService {
  user: UserConfig;
  constructor() { }
}
