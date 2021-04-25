import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { of } from 'rxjs';

import { ErrorService } from 'src/app/core/services';

import { AleloErrorComponent } from './alelo-error.component';




describe('AleloErrorComponent', () => {

  let component: AleloErrorComponent;

  let fixture: ComponentFixture<AleloErrorComponent>;

  let small: Element;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [FormsModule, ReactiveFormsModule],
      declarations: [AleloErrorComponent],
      providers: [
        ErrorService
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AleloErrorComponent);
    component = fixture.componentInstance;

  });

  it('should component init', () => {
    expect(component).toBeDefined();
  });

  it('should test ngOnInit with observable show true touched true', () => {

    let mockControl = {
      statusChanges: of({}),
      invalid: true,
      touched: true,
      dirty: true
    } as FormControl;

    component.control = mockControl;

    component.ngOnInit();

    component.show.subscribe(value => {
      expect(value).toBeTruthy();
    });

  });

  it('should test ngOnInit with observable show true with touched false', () => {

    let mockControl = {
      statusChanges: of({}),
      invalid: true,
      touched: false,
      dirty: true
    } as FormControl;

    component.control = mockControl;

    component.ngOnInit();

    component.show.subscribe(value => {
      expect(value).toBeTruthy();
    });

  });

  it('should test ngOnInit with observable and control null', () => {

    const spy = spyOn(component['cdr'], 'detectChanges');

    component.control = null;

    component.ngOnInit();

    expect(spy).not.toHaveBeenCalled();



  });

  it('should test get text and validate field is required: dirty FALSE', () => {

    let mockControl = {
      statusChanges: of({}),
      invalid: true,
      touched: true,
      dirty: false,
      errors: {
        required: true
      }
    } as any;

    component.control = mockControl;

    component.ngOnInit();

    small = fixture.nativeElement.querySelector('.error-text');
    expect(small.innerHTML).toContain('field is required.');

  });

  it('should test get text and validate field is required: dirty TRUE', () => {

    let mockControl = {
      statusChanges: of({}),
      invalid: true,
      touched: false,
      dirty: true,
      errors: {
        required: true
      }
    } as any;

    component.control = mockControl;

    component.ngOnInit();

    small = fixture.nativeElement.querySelector('.error-text');
    expect(small.innerHTML).toContain('field is required.');

  });

  it('should test get text and validate return false', () => {

    let mockControl = {
      statusChanges: of({}),
      invalid: true,
      touched: false,
      dirty: false,
      errors: {
        maxLength: true
      }
    } as any;

    component.control = mockControl;

    expect(component.text).toBeNull();

  });

});
