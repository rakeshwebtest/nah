import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  localStorageKey = "nah"; //environment.localStorageKey;
  constructor() { }
  /**
   * @param {any} key
   * @param {boolean} [json] if ture string to json convertion
   * @returns
   * @memberof LocalStorageService
   */
  getItem(key, json?: boolean) {
    if (json) {
      return JSON.parse(localStorage.getItem(this.localStorageKey + '_' + key));
    } else {
      return localStorage.getItem(this.localStorageKey + '_' + key);
    }

  }
  /**
   * @param {any} key
   * @param {any} data
   * @param {boolean} [json]
   * @memberof LocalStorageService
   */
  setItem(key, data, json?: boolean) {
    let result = data;
    if (json) {
      result = JSON.stringify(data);
    }
    localStorage.setItem(this.localStorageKey + '_' + key, result);
  }
  /**
   * @param {any} key
   * @memberof LocalStorageService
   */
  removeItem(key) {
    localStorage.removeItem(this.localStorageKey + '_' + key);
  }

}
