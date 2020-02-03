import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs-compat/Observable';
import { throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/throw';
// import 'rxjs/add/operator/throwError';
import { LoadingIndicatorService } from './loading-indicator.service';
import { environment } from '../../environments/environment';
import { LocalStorageService } from './local-storage.service';
import { ToasterService } from '../services/toaster.service';
import { AppConfigService } from './app-config.service';
import { SessionService } from '../services/session.service';
import { SessionStorageService } from './session-storage.service';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor(private loader: LoadingIndicatorService,
        private ls: LocalStorageService,
        private toasterService: ToasterService,
        private sessionService: SessionService) { }

    /**
     *
     *
     * @param {HttpRequest<any>} request
     * @param {HttpHandler} next
     * @returns {Observable<HttpEvent<any>>}
     * @memberof HttpInterceptorService
     */
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // console.log('request', typeof request.headers, request.headers.get('client'));
        request = request.clone({
            setHeaders: {
                // 'Access-Control-Allow-Origin': '*',
                
                "Content-Type": "application/json"
            },
            url: request.url
        });
        //withCredentials: true

        // if user logged in you need to pass token
        if (this.sessionService.checkSession()) {
           
            const sessionUser: any = this.ls.getItem('user', true);
            console.log('this.ls.getItem', sessionUser);
            request = request.clone({
                setHeaders: {
                    // 'Access-Control-Allow-Origin': '*',
                    authorization: 'Bearer ' + sessionUser.token,
                    "Content-Type": "application/json"
                },
                // withCredentials: false,
                body: request.body
            });
        }
        // Working Code
        console.log('request', request);
        this.loader.onStarted(request); // start Loader
        return next.handle(request).map(event => {
            if (event instanceof HttpResponse) {
                this.loader.onFinished(request);
                // cache.put(request, event);
                console.log('event', event);
                event = event.clone({ body: this.getResponse(event.body) });
            }
            return event;
        }).catch(err => {
            this.loader.onFinished(request);
            if (err.status === 401) {
                this.sessionService.sessionExpired();
                this.toasterService.show('error', err.error.message);
            } else {
                this.toasterService.show('error', err.name, err.message + ' Url :' + request.url);
            }
            // return Observable.throw(err);
            return throwError(err);
        });
    }


    /**
     * @private
     * @param {any} res
     * @returns json object
     * @memberof HttpInterceptor
     */
    private getResponse(res) {
        const resJson = res;

        console.log('resJson', resJson);
        if (resJson && resJson.success) {
            if (resJson.message) {
                this.toasterService.show('success', resJson.message, '');
            }
        } else {
            // Multiple error
            this.toasterService.show('error', resJson.message, ' ');
            if (resJson.data && resJson.data.errors) {
                console.log('resJson.data.errors', resJson.data.errors);
                Object.keys(resJson.data.errors).forEach(e => {
                    this.toasterService.show('error', resJson.data.errors[e], e);
                });
            } else {
                this.toasterService.show('error', resJson.message, ' ');
            }
        }
        return resJson;
    }
}
