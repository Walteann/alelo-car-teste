import {ControlContainer, ControlValueAccessor, FormControl, FormControlDirective} from '@angular/forms';
import {Component, Injector, Input, ViewChild} from '@angular/core';

@Component({
  template: ''
})
export class ControlValueAccessorConnector implements ControlValueAccessor {
  @ViewChild(FormControlDirective, {static: true})
  formControlDirective: FormControlDirective;

  @Input()
  formControl: FormControl;

  @Input()
  formControlName: string;

  get control() {
    return this.formControl || this.controlContainer.control.get(this.formControlName);
  }

  constructor(private injector: Injector) {
  }

  get controlContainer() {
    return this.injector.get(ControlContainer);
  }

  registerOnTouched(fn: any): void {
    if (this.formControlDirective && this.formControlDirective.valueAccessor) {
      this.formControlDirective.valueAccessor.registerOnTouched(fn);
    }
  }

  registerOnChange(fn: any): void {
    if (this.formControlDirective && this.formControlDirective.valueAccessor) {
      this.formControlDirective.valueAccessor.registerOnChange(fn);
    }
  }

  writeValue(obj: any): void {
    if (this.formControlDirective && this.formControlDirective.valueAccessor) {
      this.formControlDirective.valueAccessor.writeValue(obj);
    }
  }

  setDisabledState(isDisabled: boolean): void {
    if (this.formControlDirective && this.formControlDirective.valueAccessor) {
      this.formControlDirective.valueAccessor.setDisabledState(isDisabled);
    }
  }
}
