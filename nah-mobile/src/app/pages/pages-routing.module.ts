import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PagesPage } from './pages.page';
import { FaqComponent } from './faq/faq.component';
import { PrivacyComponent } from './privacy/privacy.component';

const routes: Routes = [
  {
    path: '',
    component: PagesPage
  },
  {
    path: 'faq',
    component: FaqComponent
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesPageRoutingModule {}
