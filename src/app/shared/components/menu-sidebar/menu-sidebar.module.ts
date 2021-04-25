import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuCollapseModule } from '../menu-collapse/menu-collapse.module';

import { MenuSidebarComponent } from './menu-sidebar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MenuCollapseModule
  ],
  exports: [MenuSidebarComponent],
  declarations: [MenuSidebarComponent],
  providers: [],
})
export class MenuSidebarModule { }
