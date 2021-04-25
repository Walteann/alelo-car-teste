import { TestBed } from '@angular/core/testing';

import { AleloButtonModule } from './../alelo-button/alelo-button.module';
import { AleloDeleteComponent } from './alelo-delete.component';

describe('AleloDeleteComponent', () => {
  let component: AleloDeleteComponent;
  beforeEach(async ()=> {

    await TestBed.configureTestingModule({
      imports: [AleloButtonModule],
      declarations: [AleloDeleteComponent]
    }).compileComponents();

    component = new AleloDeleteComponent();

  });

  it('should test onConfirm and emit event response', () => {
    component.idDelete = 10;
    const spy = spyOn(component.response, 'emit');
    component.onConfirm();
    expect(spy).toHaveBeenCalledWith(10);
  });

  it('should test onCancel and emit event response with null', () => {

    const spy = spyOn(component.response, 'emit');
    component.onCancel();
    expect(spy).toHaveBeenCalledWith(null);
  });

});
