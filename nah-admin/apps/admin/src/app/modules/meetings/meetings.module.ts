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
import { SafePipe } from './safe.pipe';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@NgModule({
  declarations: [MeetingListComponent, MeetingDetailsComponent, SafePipe],
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
    FormsModule
  ],
  exports: [
    SafePipe
  ]
})
export class MeetingsModule { }
