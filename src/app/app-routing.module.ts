import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () => import('./pages/dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'vehicles',
    loadChildren: () => import('./pages/vehicles/vehicles.module').then(m => m.VehiclesModule)
  },
  {
    path: 'reports',
    loadChildren: () => import('./pages/reports/reports.module').then(m => m.ReportsModule)
  },
  {
    path: '',
    redirectTo: 'vehicles',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
