import { NgModule } from '@angular/core';
import { AleloButtonModule } from '../alelo-button/alelo-button.module';

import { AleloDeleteComponent } from './alelo-delete.component';

@NgModule({
  imports: [AleloButtonModule],
  exports: [AleloDeleteComponent],
  declarations: [AleloDeleteComponent],
  providers: [],
})
export class AleloDeleteModule { }
