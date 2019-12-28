import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  sessionStorageKey = "zc";
  constructor() { }

  /**
   * @param {any} key
   * @param {boolean} [json] if ture string to json convertion
   * @returns
   * @memberof sessionStorageService
   */
  getItem(key, json?: boolean) {
    if (json) {
      return JSON.parse(sessionStorage.getItem(this.sessionStorageKey + '_' + key));
    } else {
      return sessionStorage.getItem(this.sessionStorageKey + '_' + key);
    }

  }

  /**
   * @param {any} key
   * @param {any} data
   * @param {boolean} [json]
   * @memberof sessionStorageService
   */
  setItem(key, data, json?: boolean) {
    let result = data;
    if (json) {
      result = JSON.stringify(data);
    }
    sessionStorage.setItem(this.sessionStorageKey + '_' + key, result);
  }

  /**
   * @param {any} key
   * @memberof sessionStorageService
   */
  removeItem(key) {
    sessionStorage.removeItem(this.sessionStorageKey + '_' + key);
  }
}
