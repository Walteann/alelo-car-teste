import { Injector } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormControlDirective, FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ControlValueAccessorConnector } from './control-value-acessor-connector';

describe('ControlValueAcessorConnector', () => {

  let component: ControlValueAccessorConnector;
  let fixture: ComponentFixture<ControlValueAccessorConnector>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
      ],
      declarations: [
        ControlValueAccessorConnector
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ControlValueAccessorConnector);

    component = fixture.componentInstance;

  })

  it('init component', () => {

    const ijt = TestBed.inject(Injector);
    const spy = spyOn(ijt, 'get');

    const control = component.controlContainer;
    expect(control).toBeUndefined();
    expect(spy).toHaveBeenCalled();

  });

  it('registerOnTouched call valueAccessor.registerOnTouched', () => {

    const formControlDirectiveMock = {
      valueAccessor: {
        registerOnTouched(fn) {}
      }
    } as FormControlDirective;

    component.formControlDirective = formControlDirectiveMock;

    component.registerOnTouched(() => {});

    expect(component.formControlDirective.valueAccessor).toBeDefined();

  });

  it('registerOnTouched call NOT valueAccessor.registerOnTouched', () => {

    const formControlDirectiveMock = {
      valueAccessor: null
    } as FormControlDirective;

    component.formControlDirective = formControlDirectiveMock;

    component.registerOnTouched(() => {});

    expect(component.formControlDirective.valueAccessor).toBeNull();

  });



  it('registerOnTouched call valueAccessor.registerOnChange', () => {

    const formControlDirectiveMock = {
      valueAccessor: {
        registerOnChange(fn) {}
      }
    } as FormControlDirective;

    component.formControlDirective = formControlDirectiveMock;

    component.registerOnChange(() => {});

    expect(component.formControlDirective.valueAccessor).toBeDefined();

  });

  it('registerOnChange call NOT valueAccessor.registerOnChange', () => {

    const formControlDirectiveMock = {
      valueAccessor: null
    } as FormControlDirective;

    component.formControlDirective = formControlDirectiveMock;

    component.registerOnChange(() => {});

    expect(component.formControlDirective.valueAccessor).toBeNull();

  });


  it('writeValue call valueAccessor.writeValue', () => {

    const formControlDirectiveMock = {
      valueAccessor: {
        writeValue(fn) {}
      }
    } as FormControlDirective;

    component.formControlDirective = formControlDirectiveMock;

    component.writeValue({});

    expect(component.formControlDirective.valueAccessor).toBeDefined();

  });

  it('writeValue call NOT valueAccessor.writeValue', () => {

    const formControlDirectiveMock = {
      valueAccessor: null
    } as FormControlDirective;

    component.formControlDirective = formControlDirectiveMock;

    component.writeValue({});

    expect(component.formControlDirective.valueAccessor).toBeNull();

  });

  it('setDisabledState call valueAccessor.setDisabledState', () => {

    const formControlDirectiveMock = {
      valueAccessor: {
        setDisabledState(fn) {}
      }
    } as FormControlDirective;

    component.formControlDirective = formControlDirectiveMock;

    component.setDisabledState(true);

    expect(component.formControlDirective.valueAccessor).toBeDefined();

  });

  it('setDisabledState call NOT valueAccessor.setDisabledState', () => {

    const formControlDirectiveMock = {
      valueAccessor: null
    } as FormControlDirective;

    component.formControlDirective = formControlDirectiveMock;

    component.setDisabledState(true);

    expect(component.formControlDirective.valueAccessor).toBeNull();

  });

  it('should test control return message alelo', () => {

    let mockFormControl = {
      setValue(value: any, options?: {
        onlySelf?: boolean;
        emitEvent?: boolean;
        emitModelToViewChange?: boolean;
        emitViewToModelChange?: boolean;
    }) {}
  } as FormControl;

    component.formControl = mockFormControl;


    expect(component.control).toEqual(mockFormControl);


    const controlMock = {
      control: {
        get(formControlName: string) {
          return mockFormControl
        }
      }
    }

    component.formControl = null;
    const ijt = TestBed.inject(Injector);
    spyOn(ijt, 'get').and.returnValue(controlMock);

    expect(component.control).toEqual(mockFormControl);
  });



});
