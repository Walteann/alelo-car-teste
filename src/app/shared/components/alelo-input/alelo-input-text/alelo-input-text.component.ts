import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { ControlValueAccessorConnector } from '../control-value-acessor-connector';

@Component({
  selector: 'alelo-input-text',
  templateUrl: 'alelo-input-text.component.html',
  styleUrls: ['./alelo-input-text.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AleloInputTextComponent,
      multi: true
    }
  ]
})

export class AleloInputTextComponent extends ControlValueAccessorConnector {

  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() isSubmitEnter: boolean = false;
  @Input() label: string = null;
  @Input() maxLength: number;

  @Output() enterSubmit = new EventEmitter();

  constructor(injector: Injector) {
    super(injector);
  }

  onEnter(): void {
    if (this.enterSubmit) {
      this.enterSubmit.emit('submit');
    }
  }

}
