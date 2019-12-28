import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';
import { LocalStorageService } from './local-storage.service';

const maxAge = 30000;
@Injectable()
export class RequestCache {

    cache = new Map();

    constructor(private ls: LocalStorageService) {

    }

    get(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);
        // console.log('req', req);
        // console.log('cached', cached);

        if (!cached) {
            return undefined;
        }

        const isExpired = cached.lastRead < (Date.now() - maxAge);
        const expired = isExpired ? 'expired ' : '';
        return cached.response;
    }

    getPayload(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);
        return cached.payload;
    }

    put(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.url;
        const payload = req.body;
        const entry = { url, payload, response, lastRead: Date.now() };
        this.cache.set(url, entry);

        // console.log('SET', this.cache);
        console.log('- - - - - - - - - - - - - - -');
        const expired = Date.now() - maxAge;
        this.cache.forEach(expiredEntry => {
            if (expiredEntry.lastRead < expired) {
                this.cache.delete(expiredEntry.url);
            }
        });
    }


    // Local Storage
    getCache(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);

        if (!cached) {
            return undefined;
        }
        // return cached.response;

        const Cache_Service = this.ls.getItem('cacheServices', true);
        if (Cache_Service) {
            const Check_Responce = Cache_Service.filter(cs => cs.url === url);
            if (Check_Responce && Check_Responce.lenth > 0) {
                return Check_Responce[0]['response'];
            }
        }
        return cached.response;
    }

    getCachePayload(req: HttpRequest<any>): HttpResponse<any> | undefined {
        const url = req.urlWithParams;
        const cached = this.cache.get(url);
        // return cached.payload;

        // Local Storage
        const Cache_Service = this.ls.getItem('cacheServices', true);
        if (Cache_Service) {

            // Refresh
            const URL = url.split('/');
            // console.log('URL', URL);
            if (URL.length) {
                let canDelete = false;
                // console.log('last', URL[URL.length - 1]);
                if (URL[URL.length - 1] !== 'list' || URL[URL.length - 2] !== 'list') {
                    // console.log('URL', URL[URL.length - 1]);
                    if (Cache_Service && Cache_Service.length > 0) {
                        Cache_Service.forEach((cs, index) => {
                            const CacheURL = cs.url.split('/');
                            // console.log('CacheURL', CacheURL);
                            if (CacheURL[CacheURL.length - 1] === 'list') {
                                canDelete = true;
                            } else if (CacheURL.includes('dataSet') && CacheURL[CacheURL.length - 2] === 'list') {
                                canDelete = true;
                            }
                            if (canDelete) {
                                   Cache_Service.splice(index, 1);
                            }
                        });
                    }
                }
            }
            // Refresh

            const Check_Payload = Cache_Service.filter(cs => cs.url === url);
            if (Check_Payload && Check_Payload.length > 0) {
                return Check_Payload[0]['payload'];
            } else {
                return Check_Payload;
            }
        }
        return cached.payload;
    }

    putCache(req: HttpRequest<any>, response: HttpResponse<any>): void {
        const url = req.url;
        const payload = req.body;
        const entry = { url, payload, response, lastRead: Date.now() };
        this.cache.set(url, entry);

        // Local Storage Starts
        const Cache_Service = this.ls.getItem('cacheServices', true);
        let cacheServices = [];
        if (Cache_Service) {
            let isCache = false;
            Cache_Service.forEach((cache, index) => {
                if (cache.url === url) {
                    Cache_Service[index]['payload'] = payload;
                    isCache = true;
                }
            });
            if (!isCache) {
                Cache_Service.push(entry);
            }
            cacheServices = Cache_Service;
            if (cacheServices.length > 10) {
                cacheServices.splice(0, cacheServices.length - 10);
            }
        } else {
            cacheServices.push(entry);
        }
        this.ls.setItem('cacheServices', cacheServices, true);
        /* const URL = url.split('/');
        // console.log('URL', URL);
        if (URL.length) {
            let canDelete = false;
            // console.log('last', URL[URL.length - 1]);
            // if (URL[URL.length - 1] === 'list' || URL[URL.length - 2] === 'list') {

            if (Cache_Service && Cache_Service.length > 0) {
                Cache_Service.forEach((cs, index) => {
                    const CacheURL = cs.url.split('/');
                    console.log('CacheURL', CacheURL);
                    if (CacheURL[CacheURL.length - 1] === 'list') {
                        canDelete = true;
                    } else if (CacheURL.includes('dataSet') && CacheURL[CacheURL.length - 2] === 'list') {
                        canDelete = true;
                    }
                    if (canDelete) {
                        cacheServices.splice(index, 1);
                    }
                });
            }
            // }
        } */
        // console.log('includes', URL.includes('dataSet'));
        // Local Storage Ends
        // console.log('- - - - - - - - - - - - - - -');
        /* const expired = Date.now() - maxAge;
        this.cache.forEach(expiredEntry => {
            if (expiredEntry.lastRead < expired) {
                this.cache.delete(expiredEntry.url);
            }
        }); */
    }
}
