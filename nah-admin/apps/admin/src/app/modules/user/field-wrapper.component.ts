// panel-wrapper.component.ts
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { FieldWrapper } from '@ngx-formly/core';

@Component({
selector: 'formly-wrapper-field',
template: `
 <div class="form-group row custom-form-group">
   <label class="custom-label col-12 col-md-4">{{ to.label }}</label>
   <div class="custom-field col-12 col-md-8">
     <ng-container #fieldComponent></ng-container>
     <div class="description" *ngIf="to.description">{{ to.description }}</div>
   </div>
 </div>
`,
})
export class FieldWrapperComponent extends FieldWrapper {
}