import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCreateComponent } from './user-create/user-create.component';
import { UserRoutingModule } from './user-routing.module';
import {FormlyModule, FieldWrapper} from '@ngx-formly/core';
import {FormlyBootstrapModule} from '@ngx-formly/bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserAmountComponent } from './user-amount/user-amount.component';
import { UserListComponent } from './user-list/user-list.component';
import {TableModule} from 'primeng/table';
import {  NgbDropdown, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FieldWrapperComponent } from './field-wrapper.component';
import { ProfileComponent } from './profile/profile.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextModule} from 'primeng/inputtext';
import { BlockedUserListComponent } from './blocked-user-list/blocked-user-list.component';
@NgModule({
  declarations: [UserCreateComponent, UserAmountComponent, UserListComponent, FieldWrapperComponent, ProfileComponent, ChangePasswordComponent, BlockedUserListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserRoutingModule,
    FormlyModule.forRoot({
      wrappers: [
        { name: 'horizontal-field', component: FieldWrapperComponent },
      ],
    }),
    FormlyBootstrapModule,
    TableModule,
    NgbModule,
    DropdownModule,
    InputTextModule,
    FormsModule
  ],
  providers:[
  ],
  exports: [
    FieldWrapperComponent
  ]
})
export class UserModule {

}
