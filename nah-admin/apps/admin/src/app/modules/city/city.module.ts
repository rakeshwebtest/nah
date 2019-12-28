import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CityRoutingModule } from './city-routing.module';
import { CityListComponent } from './city-list/city-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { TableModule } from 'primeng/table';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [CityListComponent],
  imports: [
    CommonModule,
    CityRoutingModule,
    ReactiveFormsModule,
    FormlyModule.forRoot({
      wrappers: [
      ],
    }),
    FormlyBootstrapModule,
    TableModule,
    NgbModule
  ]
})
export class CityModule { }
