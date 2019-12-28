import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommonModule } from '@angular/common';
import { McBreadcrumbsModule } from 'ngx-breadcrumbs';
import { OnboardLayoutComponent } from './layout/onboard-layout/onboard-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { NgbModule, NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { ToasterService } from './services/toaster.service';
import { ErrorHandlerService } from './utils/error-handler.service';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpInterceptorService } from './utils/http-interceptor.service';
import { AppHttpClient, AppHttpClientCreator } from './utils/app-http-client.service';
import { AppConfigService } from './utils/app-config.service';
import { LoadingIndicatorService } from './utils/loading-indicator.service';
import { LocalStorageService } from './utils/local-storage.service';
import { ToastrModule } from 'ngx-toastr';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

@NgModule({
  declarations: [
    OnboardLayoutComponent,
    LoginComponent,
    AppComponent
  ],
  imports: [
    ToastrModule.forRoot({
      timeOut: 6000,
      positionClass: 'toast-top-center',
      preventDuplicates: true,
      closeButton: true
    }),
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    McBreadcrumbsModule.forRoot(),
  ],
  providers: [
    ToasterService,
    LoadingIndicatorService,
    LocalStorageService,
    AuthGuard,
    LoginGuard,
    AppConfigService,
    {
      provide: AppHttpClient,
      useFactory: AppHttpClientCreator,
      deps: [HttpClient, AppConfigService]
    },
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
