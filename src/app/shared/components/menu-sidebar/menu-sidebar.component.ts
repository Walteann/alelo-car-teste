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
export class MenuSidebarComponent implements OnInit, OnDestroy {

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

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
   this.subscription = this.router.events
    .subscribe((route: any) => {
      if (route.routerEvent && route.routerEvent.url) {
        this.urlCurrent = `/${route.routerEvent.url.split('/')[1]}`;
      }
   });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  redirectToRoute(url: string): void {
    this.menuCollapse.changeCollapse();
    this.router.navigate([url]);
  }

  changeMenuSideBar(isCollapsed: boolean): void {

    if (isCollapsed) {
      document.getElementById('sideBarMenu').classList.add('menu-sidebar-collapsed');
    } else {
      document.getElementById('sideBarMenu').classList.remove('menu-sidebar-collapsed');
    }
  }

}
