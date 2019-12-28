import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideMenuComponent } from './side-menu/side-menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserLayoutRoutingModule } from './user-layout-routing.module';
import { RouterModule } from '@angular/router';
import { UserLayoutComponent } from './user-layout.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NAV_DROPDOWN_DIRECTIVES } from './side-menu/dropdown-toggle.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarToggleDirective } from './side-menu/sidebar-toggle.directive';
import { EventsComponent } from '../../modules/events/events.component';
import { TableModule } from 'primeng/table';
import { TabViewModule } from 'primeng/tabview';
import { AccordionModule } from 'primeng/accordion';
import {InputSwitchModule} from 'primeng/inputswitch';
@NgModule({
  declarations: [
    SideMenuComponent,
    UserLayoutComponent,
    NAV_DROPDOWN_DIRECTIVES,
    SidebarToggleDirective,
    EventsComponent
  ],
  imports: [
    CommonModule,
    UserLayoutRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    ButtonModule,
    CheckboxModule,
    NgbModule,
    TableModule,
    TabViewModule,
    AccordionModule,
    InputSwitchModule
  ]
})
export class UserLayoutModule { }
