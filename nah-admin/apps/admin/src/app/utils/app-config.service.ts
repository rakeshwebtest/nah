import { Injectable } from '@angular/core';
import { SiteConfig } from './site-config.service';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  siteConfig: SiteConfig;
  settings: any = {};
  constructor() { }

}
