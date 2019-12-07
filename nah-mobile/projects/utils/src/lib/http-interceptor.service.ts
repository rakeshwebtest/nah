import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { throwError } from 'rxjs';
import { map, filter, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

    constructor() { }

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
                 'Access-Control-Allow-Origin': '*',
                "Content-Type": "application/json"
            },
            url: request.url
        });
        //withCredentials: true

        // if user logged in you need to pass token
        // if (this.sessionService.checkSession()) {
        //     request = request.clone({
        //         setHeaders: {
        //             // 'Access-Control-Allow-Origin': '*',
        //             "Content-Type": "application/json"
        //         },
        //         withCredentials: false,
        //         body: request.body
        //     });
        // }
        // Working Code
        console.log('request', request);

        return next.handle(request).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    event = event.clone({ body: this.getResponse(event.body) });
                }
                return event;
            }, error => {
                console.error('NICE ERROR', error)
            }));


        // return next.handle(request).map(event => {
        //         if (event instanceof HttpResponse) {
        //             // cache.put(request, event);
        //             console.log('event', event);
        //             event = event.clone({ body: this.getResponse(event.body) });
        //         }
        //         return event;
        //     }).catch(err => {
        //         if (err.status === 401) {
        //         } else {
        //         }
        //         // return Observable.throw(err);
        //         return throwError(err);
        //     });
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
            }
        } else {
            // Multiple error
            if (resJson.data && resJson.data.errors) {
                console.log('resJson.data.errors', resJson.data.errors);
                Object.keys(resJson.data.errors).forEach(e => {
                });
            } else {
            }
        }
        return resJson;
    }
}
