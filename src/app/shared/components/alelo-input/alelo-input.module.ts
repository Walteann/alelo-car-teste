import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AleloErrorModule } from '../alelo-error/alelo-error.module';

import { AleloInputRadioComponent } from './alelo-input-radio/alelo-input-radio.component';
import { AleloInputTextComponent } from './alelo-input-text/alelo-input-text.component';
import { ControlValueAccessorConnector } from './control-value-acessor-connector';

const SHARED_INPUT = [
  AleloInputTextComponent,
  AleloInputRadioComponent,
  ControlValueAccessorConnector
]

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AleloErrorModule
  ],
  exports: SHARED_INPUT,
  declarations: SHARED_INPUT,
  providers: [],
})
export class AleloInputModule { }
