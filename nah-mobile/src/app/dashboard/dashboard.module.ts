import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardComponent } from './dashboard.component';
import { MeetingListModule } from '../shared/meeting-list/meeting-list.module';
import { MeetingsPageModule } from '../meetings/meetings.module';
import { MeetingsPage } from '../meetings/meetings.page';
import { BottomTabsComponent } from './bottom-tabs/bottom-tabs.component';
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
            loadChildren: () => import('../meetings/meetings.module').then( m => m.MeetingsPageModule)
          },
          {
            path: 'posts',
            loadChildren: () => import('../posts/posts.module').then( m => m.PostsPageModule)
          },
          {
            path: 'bookmark',
            loadChildren: () => import('../bookmark/bookmark.module').then( m => m.BookmarkPageModule)
          },
          {
            path: 'notifications',
            loadChildren: () => import('../notifications/notifications.module').then( m => m.NotificationsPageModule)
          }
        ]
      }
      
    ]
  }
]

@NgModule({
  declarations: [
    DashboardComponent,
    BottomTabsComponent
  ],
  imports: [
    MeetingsPageModule,
    CommonModule,
    IonicModule,
    MeetingListModule
  ],
  exports:[DashboardComponent]
})
export class DashboardModule { }
