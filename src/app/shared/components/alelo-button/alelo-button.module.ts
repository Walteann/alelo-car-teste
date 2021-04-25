import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AleloButtonComponent } from './alelo-button.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AleloButtonComponent],
  exports: [AleloButtonComponent]
})
export class AleloButtonModule { }
