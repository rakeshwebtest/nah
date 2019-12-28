import { Component } from '@angular/core';
import {
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError,
  Router
} from '@angular/router';
import 'rxjs/add/operator/delay';
import { LoadingIndicatorService } from './utils/loading-indicator.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  loading = true;
  server_loading = false;
  constructor(
    private router: Router,
    private loadingIndicatorService: LoadingIndicatorService
  ) {
    // for http service loader
    this.loadingIndicatorService.onLoadingChanged.delay(0).subscribe(res => {
      this.server_loading = res;
    });
    // for router interception
    router.events.subscribe((event: RouterEvent) => {
      // if (!(event instanceof NavigationEnd)) {
      //   return;
      // }
      this.navigationInterceptor(event);
      window.scrollTo(0, 0);
    });
  }
  navigationInterceptor(event: RouterEvent): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      this.loading = false;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }
}
