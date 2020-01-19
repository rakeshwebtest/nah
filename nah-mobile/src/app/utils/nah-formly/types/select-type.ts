import { Component } from '@angular/core';
import { FieldType } from '@ngx-formly/core';

@Component({
    selector: 'formly-field-select',
    template: `
    <ionic-selectable item-content  [placeholder]="to.placeholder" [itemValueField]="to.itemValueField"
    [shouldStoreItemValue]="to.itemValueField"
    [formControl]="formControl" [ionFormlyAttributes]="field"
    [itemTextField]="to.itemTextField" [items]="to.options" [canSearch]="true">
  </ionic-selectable>
  `,
})
export class FieldSelectableComponent extends FieldType {


}
