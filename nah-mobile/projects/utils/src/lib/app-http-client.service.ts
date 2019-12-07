import { HttpClient, HttpErrorResponse, HttpRequest, HttpHeaders, HttpParams, HttpEvent } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';

export interface IRequestOptions {
    headers?: HttpHeaders;
    observe?: 'body';
    params?: HttpParams;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
    body?: any;
}


@Injectable({
    providedIn: 'root'
})
export class AppHttpClient {

    // private api = environment.apiUrl;
    private api: any = 'http://localhost:3333/api/';
    _isLoader = true;

    // Extending the HttpClient through the Angular DI.
    public constructor(public http: HttpClient,
        public injector: Injector) {
        // If you don't want to use the extended versions in some cases you can access the public property and use the original one.
        // for ex. this.httpClient.http.get(...)
    }

    /**
     * GET request
     * @param {string} endPoint it doesn't need / in front of the end point
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public get<T>(endPoint: string, options?: IRequestOptions): Observable<any> {
        return this.http.get<T>(this.api + endPoint, options);
    }

    /**
     * POST request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public post<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<any> {
        return this.http.post<T>(this.api + endPoint, params, options);
    }

    /**
     * PUT request
     * @param {string} endPoint end point of the api
     * @param {Object} params body of the request.
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public put<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<any> {
        return this.http.put<T>(this.api + endPoint, params, options);
    }

    /**
    * PATCH request
    * @param {string} endPoint end point of the api
    * @param {Object} params body of the request.
    * @param {IRequestOptions} options options of the request like headers, body, etc.
    * @returns {Observable<T>}
    */
    public patch<T>(endPoint: string, params: Object, options?: IRequestOptions): Observable<any> {
        return this.http.patch<T>(this.api + endPoint, params, options);
    }

    /**
     * DELETE request
     * @param {string} endPoint end point of the api
     * @param {IRequestOptions} options options of the request like headers, body, etc.
     * @returns {Observable<T>}
     */
    public delete<T>(endPoint: string, options?: IRequestOptions): Observable<any> {
        return this.http.delete<T>(this.api + endPoint, options);
    }
    public getTranslation(lang: string): Observable<Object> {
        return this.http.get('./assets/i18n/' + lang + '.json');
    }
    public getJsonFile(url): Observable<Object> {
        return this.http.get(url);
    }
    postFile(fileToUpload: File, endPoint): Observable<boolean> {
        // const endpoint = 'your-destination-url';
        const getHeaders: HttpHeaders = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        });
        const formData: FormData = new FormData();
        formData.append('pic', fileToUpload, 'pic');
        return this.post(endPoint, formData, { headers: getHeaders });
    }
}

export function AppHttpClientCreator(http: HttpClient, injector: Injector) {
    return new AppHttpClient(http, injector);
}
