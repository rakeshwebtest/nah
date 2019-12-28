import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OnboardLayoutComponent } from './layout/onboard-layout/onboard-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { LoginGuard } from './guards/login.guard';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    // canLoad: [LoginGuard],
    // canActivate: [LoginGuard],
    component: OnboardLayoutComponent,
    children: [
      {
        path: '',
        component: LoginComponent,
        data: {
          breadcrumbs: 'Login'
        }
      }
    ]
  },
  {
    path: 'admin',
    // canLoad: [AuthGuard],
    // canActivate: [AuthGuard],
    loadChildren: './layout/user-layout/user-layout.module#UserLayoutModule',
    data: {
      breadcrumbs: 'Admin'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
