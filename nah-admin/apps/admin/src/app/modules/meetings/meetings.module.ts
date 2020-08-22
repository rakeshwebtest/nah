import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeetingsRoutingModule } from './meetings-routing.module';
import { MeetingListComponent } from './meeting-list/meeting-list.component';
import { MeetingDetailsComponent } from './meeting-details/meeting-details.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatTabsModule} from '@angular/material/tabs';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { AppSharedModuleModule } from '../app-shared-module/app-shared-module.module';
@NgModule({
  declarations: [MeetingListComponent, MeetingDetailsComponent],
  imports: [
    CommonModule,
    MeetingsRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      wrappers: [
      ],
    }),
    FormlyBootstrapModule,
    TableModule,
    NgbModule,
    MatTabsModule,
    DropdownModule,
    InputTextModule,
    FormsModule,
    ConfirmDialogModule,
    AppSharedModuleModule
  ]
})
export class MeetingsModule { }
