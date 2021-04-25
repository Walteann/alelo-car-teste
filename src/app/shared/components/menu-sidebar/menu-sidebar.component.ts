import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { Menu } from '../../models';
import { MenuCollapseComponent } from './../menu-collapse/menu-collapse.component';


@Component({
  selector: 'menu-sidebar',
  templateUrl: 'menu-sidebar.component.html',
  styleUrls: ['./menu-sidebar.component.scss']
})
export class MenuSidebarComponent {

  @ViewChild('menuCollapse', {static: false}) menuCollapse: MenuCollapseComponent;

  private subscription: Subscription;
  @Output() closeMenu = new EventEmitter(false);


  urlCurrent = null;

  // TODO: Mudar cor do svg
  menus: Menu[] = [
    {
      name: 'Dashboard',
      icone: 'border-all-solid',
      url: '/dashboard'
    },
    {
      name: 'Vehicles',
      icone: 'car-side-solid',
      url: '/vehicles'
    },
    {
      name: 'Reports',
      icone: 'chart-bar-solid',
      url: '/reports'
    },
  ]

  redirectToRoute(url: string): void {
    this.menuCollapse.changeCollapse();
  }

  changeMenuSideBar(isCollapsed: boolean): void {

    if (isCollapsed) {
      document.getElementById('sideBarMenu').classList.add('menu-sidebar-collapsed');
    } else {
      document.getElementById('sideBarMenu').classList.remove('menu-sidebar-collapsed');
    }
  }

}
