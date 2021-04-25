import { NgModule } from '@angular/core';

import { ReportsRoutingModule } from './reports-routing.module';
import { ReportsComponent } from './reports.component';


@NgModule({
  imports: [
    ReportsRoutingModule
  ],
  exports: [],
  declarations: [ReportsComponent],
  providers: [],
})
export class ReportsModule { }
