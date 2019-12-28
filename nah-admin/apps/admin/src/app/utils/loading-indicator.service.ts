import { Injectable, EventEmitter } from '@angular/core';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  HttpClient,
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest
} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoadingIndicatorService {

  public onLoadingChanged: EventEmitter<boolean> = new EventEmitter<boolean>();

  /**
   * Stores all currently active requests
   */
  private requests: any[] = [];

  /**
   * Adds request to the storage and notifies observers
   */
  onStarted(req: any): void {
    //if (req.body.command !== 'listOdds')
    this.requests.push(req);
    this.notify();
  }

  /**
   * Removes request from the storage and notifies observers
   */
  onFinished(req: any): void {
    const index = this.requests.indexOf(req);
    if (index !== -1) {
      this.requests.splice(index, 1);
    }
    this.notify();
  }

  /**
   * Notifies observers about whether there are any requests on fly
   */
  private notify(): void {
    this.onLoadingChanged.emit(this.requests.length !== 0);
  }

}
