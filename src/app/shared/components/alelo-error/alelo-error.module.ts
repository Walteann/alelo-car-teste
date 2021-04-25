import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AleloErrorComponent } from './alelo-error.component';


@NgModule({
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  declarations: [AleloErrorComponent],
  exports: [AleloErrorComponent],
})
export class AleloErrorModule {}
