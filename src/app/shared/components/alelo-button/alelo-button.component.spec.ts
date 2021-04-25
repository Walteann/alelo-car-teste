import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { AleloButtonComponent } from './alelo-button.component';

describe('AleloButtonComponent', () => {
  let fixture: ComponentFixture<AleloButtonComponent>;
  let component: AleloButtonComponent;
  let btn: Element;
  beforeEach(async () => {

    await TestBed.configureTestingModule({
      declarations: [
        AleloButtonComponent
      ],
    }).compileComponents();
   fixture = TestBed.createComponent(AleloButtonComponent);
   component = fixture.componentInstance;

   btn = fixture.debugElement.query(By.css('button')).nativeElement;
  })

  it('input', () => {

    component.value = 'save vehicle';
    component.className = 'white';
    fixture.detectChanges();

    expect(btn.innerHTML).toEqual('save vehicle');
    expect(btn.classList).toContain('white');

  });

});
