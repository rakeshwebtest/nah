import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { MeetingListModule } from '../shared/meeting-list/meeting-list.module';
import { MeetingsPageModule } from '../meetings/meetings.module';
import { MeetingsPage } from '../meetings/meetings.page';
import { BottomTabsComponent } from './bottom-tabs/bottom-tabs.component';
import { MeetingTabsComponent } from './meeting-tabs/meeting-tabs.component';
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'meeting/all'
  },
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: '',
        component: BottomTabsComponent,
        children: [
          {
            path: 'meeting',
            component: MeetingTabsComponent,
            children: [
              {
                path: ':type',
                component: MeetingsPage,
              }
            ]
          },
          {
            path: 'posts',
            loadChildren: () => import('../posts/posts.module').then( m => m.PostsPageModule)
          }
        ]
      }
      
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    BottomTabsComponent,
    MeetingTabsComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    MeetingsPageModule,
    CommonModule,
    IonicModule,
    MeetingListModule
  ]
})
export class DashboardModule { }
