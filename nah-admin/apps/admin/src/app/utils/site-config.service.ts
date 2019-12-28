import { Injectable } from '@angular/core';
import { AppConfigService } from './app-config.service';
import { AppHttpClient } from './app-http-client.service';
export interface SiteConfig {
  ACCOUNT_DESCRIPTION?: string;
  ACCOUNT_LOGO?: string;
  ACCOUNT_NAME?: string;
  ACCOUNT_URL?: string;
  APP_ENCRYPTION_SECRET?: string;
  APPLY_ENCRYPTION?: boolean;
  CURRENCY?: string;
  DATE_FORMAT?: string;
  DATE_TIME_FORMAT?: string;
  ENCRYPT_RETRY?: string;
  LANGUAGE?: string;
  RECORDS_PER_PAGE?: string;
  THEME?: string;
  TIME_FORMAT?: string;
  TIMEZONE?: string;
}

@Injectable({
  providedIn: 'root'
})

export class SiteConfigService {

  constructor(private http: AppHttpClient, private appConfigService: AppConfigService) { }
  /**
   *
   *
   * @returns
   * @memberof SiteConfigService
   */
  getSiteConfig() {

    // return new Promise((resolve, reject) => {
    //   return this.http.get('site/config').map((res) => {
    //     return <SiteConfig>res.data;
    //   }).subscribe((res) => {
    //     this.appConfigService.siteConfig = res;
    //     resolve(true);
    //   });
    // });

    return new Promise((resolve, reject) => {
      return this.http.getJsonFile('assets/config.json').subscribe((res) => {
        console.log('site configuration settings -->', res);
        this.appConfigService.settings = res;
        resolve(true);
      });
    });
  }
  /**
   *
   *
   * @returns basic details
   * @memberof SiteConfigService
   */
  getBasicSetting() {
    return this.http.get('site/settings/basic').map(res => res.data);
  }
  /**
   *
   *
   * @param {any} data
   * @returns
   * @memberof SiteConfigService
   */
  updateBasicSetting(data) {
    return this.http.put('site/settings/basic', data);
  }
  /**
   * @param null
   * @name rakesh
   * @returns
   * @memberof SiteConfigService
   */
  getAdvancedSetting() {
    return this.http.get('site/settings/advanced').map(res => {
      // const files: FieldInterface[] = [];
      // if (res && res.data && ) {
      //   res.data.advanced.forEach(filed => {
      //     filed.label = filed.displayName;
      //     filed.name = filed.uid;
      //     files.push(filed);
      //   });
      // }
      return res.data.advanced;
    }
    );
  }
  /**
   *
   *
   * @param {any} data
   * @returns
   * @memberof SiteConfigService
   */
  updateAdvancedSetting(data) {
    return this.http.put('site/settings/advanced', data);
  }
}
