import { NgModule } from '@angular/core';

import { AleloButtonModule } from './alelo-button/alelo-button.module';
import { AleloDeleteModule } from './alelo-delete/alelo-delete.module';
import { AleloInputModule } from './alelo-input/alelo-input.module';
import { LoaderModule } from './loader/loader.module';
import { MenuCollapseModule } from './menu-collapse/menu-collapse.module';


const SHARED_MODULE = [
  AleloInputModule,
  AleloButtonModule,
  AleloDeleteModule,
  LoaderModule
]

@NgModule({
  imports: SHARED_MODULE,
  exports: SHARED_MODULE,
})
export class ComponentsModule { }
