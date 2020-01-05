import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';

const routes: Routes = [
   {
    path: '',
    component: UserLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadChildren: '../../dashboard/dashboard.module#DashboardModule',
        data: {
          breadcrumbs: 'Dashboard'
        }
      },
      {
        path: 'users',
        loadChildren: '../../modules/user/user.module#UserModule',
        data: {
          breadcrumbs: 'Users'
        }
      },
      {
        path: 'groups',
        loadChildren: '../../modules/groups/groups.module#GroupsModule',
        data: {
          breadcrumbs: 'Groups'
        }
      },
      {
        path: 'meetings',
        loadChildren: '../../modules/meetings/meetings.module#MeetingsModule',
        data: {
          breadcrumbs: 'Meetings'
        }
      },
      {
        path: 'city',
        loadChildren: '../../modules/city/city.module#CityModule',
        data: {
          breadcrumbs: 'City'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserLayoutRoutingModule { }
