import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ComponentsModule } from 'src/app/shared/components/components.module';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { VehiclesTableComponent } from './shared/vehicles-table/vehicles-table.component';
import { VehiclesFormComponent } from './vehicles-form/vehicles-form.componen';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';


@NgModule({
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    PipesModule,
    ComponentsModule
  ],
  exports: [],
  declarations: [
    VehiclesListComponent,
    VehiclesFormComponent,
    VehiclesTableComponent
  ],
  providers: [],
})
export class VehiclesModule { }
