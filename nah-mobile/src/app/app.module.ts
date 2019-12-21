import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { AppHttpClient, AppHttpClientCreator, HttpInterceptorService } from './utils';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SignInComponent } from './sign-in/sign-in.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChooseUserGroupsComponent } from './sign-in/choose-user-groups/choose-user-groups.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { GroupCreateModalComponent } from './group-create-modal/group-create-modal.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'choose-user-group',
    component: ChooseUserGroupsComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'user-profile',
    component: UserProfileComponent
  }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, SignInComponent, DashboardComponent, ChooseUserGroupsComponent, GroupCreateModalComponent, UserProfileComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { initialNavigation: 'enabled' }),
    IonicModule.forRoot()
  ],
  entryComponents: [GroupCreateModalComponent],
  providers: [
    StatusBar,
    NativeStorage,
    SplashScreen,
    GooglePlus,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    {
      provide: AppHttpClient,
      useFactory: AppHttpClientCreator,
      deps: [HttpClient]
    }, { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
