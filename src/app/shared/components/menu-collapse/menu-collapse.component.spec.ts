import { ElementRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { MenuCollapseComponent } from './menu-collapse.component';

const mockMenuCollapse = {
  nativeElement: {
    classList: {
      toggle: (params) => {}
    }
  }
} as ElementRef;

describe('MenuCollapseComponent', () => {
  let app: MenuCollapseComponent;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
      ],
      declarations: [
        MenuCollapseComponent
      ],
    }).compileComponents();
    const fixture = TestBed.createComponent(MenuCollapseComponent);
    app = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(app).toBeTruthy();
  });

  it('should verify changeCollapse and isChange return true', () => {
    app.menuCollapse = mockMenuCollapse;
    app.changeCollapse();
    expect(app['isChange']).toBeTruthy();
  });

  it('should verify changeCollapse and isChange return false', () => {
    app.menuCollapse = null;
    app['isChange'] = false;
    app.changeCollapse();
    expect(app['isChange']).toBeFalsy();
  });

});
