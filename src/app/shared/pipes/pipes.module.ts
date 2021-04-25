import { NgModule } from '@angular/core';

import { StatusPipe } from './status.pipe';

const SHARED_PIPES = [
  StatusPipe
];

@NgModule({
  imports: [],
  exports: SHARED_PIPES,
  declarations: SHARED_PIPES,
  providers: [],
})
export class PipesModule { }
