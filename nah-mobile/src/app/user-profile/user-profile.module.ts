import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { GroupListModule } from '../shared/group-list/group-list.module';
import { GroupListComponent } from '../shared/group-list/group-list.component';
import { AgendaViewModule } from '../agenda/agenda-view/agenda-view.module';
import { UserListModule } from '../shared/user-list/user-list.module';
import { UserListComponent } from '../shared/user-list/user-list.component';
import { UserProfileTabListComponent } from './user-profile-tab-list/user-profile-tab-list.component';
import { PostListModule } from '../posts/post-list/post-list.module';
import { MeetingListModule } from '../shared/meeting-list/meeting-list.module';
import { SuperTabsModule } from '@ionic-super-tabs/angular';
const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent,
    // children: [
    //   {
    //     path: ':type',
    //     component: GroupListComponent
    //   }
    // ]
  },
  {
    path: ':id',
    component: UserProfileComponent,
    children: [
      {
        path: '',
        redirectTo: 'following',
        pathMatch: 'full'
      },
      {
        path: ':type',
        component: UserProfileTabListComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    UserProfileComponent,
    UserProfileTabListComponent,
    PopoverMenuComponent
  ],
  entryComponents: [PopoverMenuComponent],
  imports: [
    RouterModule.forChild(routes),
    SuperTabsModule,
    CommonModule,
    IonicModule,
    GroupListModule,
    AgendaViewModule,
    UserListModule,
    PostListModule,
    MeetingListModule
  ]
})
export class UserProfileModule { }
