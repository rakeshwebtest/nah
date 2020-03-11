import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './user-profile.component';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PopoverMenuComponent } from './popover-menu/popover-menu.component';
import { GroupListModule } from '../shared/group-list/group-list.module';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: UserProfileComponent
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },

]

@NgModule({
  declarations: [
    UserProfileComponent,
    PopoverMenuComponent
  ],
  entryComponents: [PopoverMenuComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    IonicModule,
    GroupListModule
  ]
})
export class UserProfileModule { }
