import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesFormComponent } from './vehicles-form/vehicles-form.componen';

import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';

export const routes: Routes = [
  {
    path: 'list',
    component: VehiclesListComponent
  },
  {
    path: 'new',
    component: VehiclesFormComponent
  },
  {
    path: ':id/edit',
    component: VehiclesFormComponent
  },
  {
    path: '',
    redirectTo: 'list'
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
