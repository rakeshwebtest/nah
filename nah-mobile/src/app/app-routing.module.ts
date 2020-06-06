import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { ChooseUserGroupsComponent } from './sign-in/choose-user-groups/choose-user-groups.component';
import { IfLoginGuard } from './services/iflogin-guard.service';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { AuthGuard } from './services/auth-guard.service';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [IfLoginGuard] },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'choose-user-group',
    component: ChooseUserGroupsComponent,
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'about',
        loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
      },
      {
        path:'dashboard',
        component:DashboardComponent,
        children: [
          {
            path: 'meeting',
            loadChildren: () => import('./meetings/meetings.module').then( m => m.MeetingsPageModule)
          },
          {
            path: 'posts',
            loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
          },
          {
            path: 'bookmark',
            loadChildren: () => import('./bookmark/bookmark.module').then( m => m.BookmarkPageModule)
          },
          {
            path: 'notifications',
            loadChildren: () => import('./notifications/notifications.module').then( m => m.NotificationsPageModule)
          }
        ]
      },
      {
        path: 'meeting',
        loadChildren: () => import('./meetings/meetings.module').then( m => m.MeetingsPageModule)
      },
      {
        path: 'posts',
        loadChildren: () => import('./posts/posts.module').then( m => m.PostsPageModule)
      },
     
      { path: 'user-profile', loadChildren: () => import('./user-profile/user-profile.module').then(m => m.UserProfileModule) },
      // {
      //   path: 'meeting',
      //   loadChildren: () => import('./meetings/meetings.module').then(m => m.MeetingsPageModule)
      // },
      {
        path: 'group',
        loadChildren: () => import('./group/group.module').then(m => m.GroupPageModule)
      },

      {
        path: 'agenda',
        loadChildren: () => import('./agenda/agenda.module').then(m => m.AgendaPageModule)
      }
    ]
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then(m => m.PagesPageModule)
  },
  {
    path: 'profile-edit',
    loadChildren: () => import('./profile-edit/profile-edit.module').then(m => m.ProfileEditPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
