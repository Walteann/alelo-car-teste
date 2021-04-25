import { Component, EventEmitter, Injector, Input, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { RadioForm } from 'src/app/shared/models';

import { ControlValueAccessorConnector } from '../control-value-acessor-connector';

@Component({
  selector: 'alelo-input-radio',
  templateUrl: 'alelo-input-radio.component.html',
  styleUrls: ['./alelo-input-radio.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: AleloInputRadioComponent,
      multi: true
    }
  ]
})

export class AleloInputRadioComponent extends ControlValueAccessorConnector {

  @Input() name: string = 'name';
  @Input() radioValues: RadioForm[];
  @Input() label: string = null;

  constructor(injector: Injector) {
    super(injector);
  }


}
