import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupsRoutingModule } from './groups-routing.module';
import { GroupListComponent } from './group-list/group-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';


@NgModule({
  declarations: [GroupListComponent],
  imports: [
    CommonModule,
    GroupsRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      wrappers: [
      ],
    }),
    FormlyBootstrapModule,
    TableModule,
    NgbModule,
    DropdownModule,
    InputTextModule,
    FormsModule
  ]
})
export class GroupsModule { }
