import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { AppHttpClient } from '../utils/app-http-client.service';
import { API_CONFIG } from '../utils/api-config';
import { LocalStorageService } from '../utils/local-storage.service';

@Injectable({ providedIn: 'root' })
export class HeaderInfoService {
    private subject = new Subject<any>();
    private keepAfterRouteChange = false;

    constructor(private router: Router, private http: AppHttpClient, private ls: LocalStorageService) {
        // clear alert messages on route change unless 'keepAfterRouteChange' flag is true
        // this.router.events.subscribe(event => {
        //     if (event instanceof NavigationStart) {
        //         if (this.keepAfterRouteChange) {
        //             // only keep for a single route change
        //             this.keepAfterRouteChange = false;
        //         } else {
        //             // clear alert message
        //             this.clear();
        //         }
        //     }
        // });
    }

    getHeaderInfo(): Observable<any> {
        return this.subject.asObservable();
    }

    updateHeaderInfo() {
        const userInfo = this.ls.getItem('user', true);
        const payload = {
            "command": "getWallet",
            "requestData": {
                "userId": userInfo.userId
            }
        };
        this.http.post(API_CONFIG.USER_WALLET, payload).subscribe(result => {
            this.subject.next(result);
        })
    }
    // success(message: string, keepAfterRouteChange = false) {
    //     this.keepAfterRouteChange = keepAfterRouteChange;
    //     this.subject.next({ type: 'success', text: message });
    // }

    // error(message: string, keepAfterRouteChange = false) {
    //     this.keepAfterRouteChange = keepAfterRouteChange;
    //     this.subject.next({ type: 'error', text: message });
    // }

    // clear() {
    //     // clear by calling subject.next() without parameters
    //     this.subject.next();
    // }
}