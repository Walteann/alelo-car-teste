import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import { MenuCollapseComponent } from '../menu-collapse/menu-collapse.component';
import { MenuCollapseModule } from '../menu-collapse/menu-collapse.module';
import { MenuSidebarComponent } from './menu-sidebar.component';

const mockMenuCollapse = {
  changeCollapse() {
    document.getElementById('sideBarMenu').classList.remove('menu-sidebar-collapsed');
  }
} as MenuCollapseComponent;

describe('MenuSidebarComponent', () => {
  let component: MenuSidebarComponent;

  const menuCollapseComponent = jasmine.createSpyObj('MenuCollapseComponent', ['changeCollapse']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MenuCollapseModule
      ],
      declarations: [
        MenuSidebarComponent
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(MenuSidebarComponent);
    component = fixture.componentInstance;
  });


  it('should check if sideBarMenu has class menu-sidebar-collapsed', () => {
    component.changeMenuSideBar(true);
    const sideBarMenu = document.getElementById('sideBarMenu');
    expect(sideBarMenu.classList).toContain('menu-sidebar-collapsed');
  });

  it('should check if sideBarMenu not have class menu-sidebar-collapsed', () => {
    component.changeMenuSideBar(false);
    const sideBarMenu = document.getElementById('sideBarMenu');
    expect(sideBarMenu.classList.length).toEqual(1);
  });

  it('should check if called redirectToRoute sideBarMenu just one class', () => {

    component.menuCollapse = menuCollapseComponent;
    component.redirectToRoute('/reports');

    expect(component.redirectToRoute).toBeDefined();
  });

});

