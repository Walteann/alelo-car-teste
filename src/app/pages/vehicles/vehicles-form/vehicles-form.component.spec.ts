import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { of, throwError } from 'rxjs';

import { AleloAlertService, VehiclesService } from 'src/app/core/services';
import { ComponentsModule } from 'src/app/shared/components/components.module';

import { VehiclesFormComponent } from './vehicles-form.componen';


const toastrMock = {
  messageSuccess(messagem: string) {},

  messageError(messagem: string) {}
}

const vehiclesAll = [
  {
    "id": "10",
    "plate": "ABC-1052",
    "model": "Class C 1.10 Avantgarde Turbo Flex ",
    "manufacturer": "Mercedes-Benz",
    "color": "black",
    "status": false
  },
  {
    "id": "11",
    "plate": "ABC-1152",
    "model": "Class C 1.11 Avantgarde Turbo Flex ",
    "manufacturer": "Mercedes-Benz",
    "color": "black",
    "status": true
  },
];

describe('VehiclesFormComponent create', () => {
  let mockActivatedRouter = {
    snapshot: {
      params: {
        id: null
      }
    }
  }

  let component: VehiclesFormComponent;
  let fixture: ComponentFixture<VehiclesFormComponent>;

  beforeEach(async () => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule
      ],
      declarations: [
        VehiclesFormComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRouter},
        { provide: AleloAlertService, useValue: toastrMock},
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesFormComponent);

    component = fixture.componentInstance;

    const vehicleService = TestBed.inject(VehiclesService);
    spyOn(vehicleService, 'findByIdVehicle').and.returnValue(of(vehiclesAll[0]));

  });

  it('Init component', () => {
    expect(component).toBeDefined();

    component.ngOnInit();
    fixture.detectChanges();
    const h2 = fixture.nativeElement.querySelector('h2');

    expect(h2.innerHTML).toContain('Create Vehicle');

  });


  it('onSubmit create vehicles', async() => {
    const router = TestBed.inject(Router);
    const spy = spyOn(router, 'navigate');


    component.form.patchValue({
      plate: "ABC-1152",
      model: "Class C 1.11 Avantgarde Turbo Flex ",
      manufacturer: "Mercedes-Benz",
      color: "black",
      status: true
    });

    spyOn(component['vehiclesService'], 'createVehicle').and.returnValue(of(
      {
        id: "11",
        plate: "ABC-1152",
        model: "Class C 1.11 Avantgarde Turbo Flex ",
        manufacturer: "Mercedes-Benz",
        color: "black",
        status: true
      }
    ))

    component.onSubmit(null);



    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();
    })

  });


  it('onSubmit create vehicles', async() => {
    const spy = spyOn(component['aleloAlertService'], 'messageError');

    component.form.patchValue({
      id: "11",
      plate: "ABC-1152",
      model: "Class C 1.11 Avantgarde Turbo Flex ",
      manufacturer: "Mercedes-Benz",
      color: "black",
      status: true
    });

    spyOn(component['vehiclesService'], 'createVehicle').and.returnValue(throwError({error: 'error'}))

    component.onSubmit(null);

    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();
    })

  });

  it('onSubmit form validate is INVALID', async() => {
    const spy = spyOn(component['aleloAlertService'], 'messageError');

    component.form.patchValue({
      id: null,
      plate: null,
      model: null,
      manufacturer: null,
      color: null,
      status: true
    });

    spyOn(component['vehiclesService'], 'createVehicle').and.returnValue(throwError({error: 'error'}))

    component.onSubmit(null);

    fixture.whenStable().then(() => {
      expect(spy).not.toHaveBeenCalled();
    })

  });

  it('should test validate withFormArray', () => {

    const formBuilder = TestBed.inject(FormBuilder);

    let form = formBuilder.group({
      name: [null, [Validators.required]],
      groups: formBuilder.array([
        {
          description: [null, [Validators.required]]
        }
      ])
    })

    expect(component['validate'](form)).toBeFalsy();

  });

});


describe('VehiclesFormComponent update', () => {
  const mockActivatedRouter = {
    snapshot: {
      params: {
        id: '11'
      }
    }
  }

  let component: VehiclesFormComponent;
  let fixture: ComponentFixture<VehiclesFormComponent>;
  let spyRouter;
  beforeEach(async () => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule
      ],
      declarations: [
        VehiclesFormComponent,
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRouter},
        { provide: AleloAlertService, useValue: toastrMock}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiclesFormComponent);

    component = fixture.componentInstance;

    const vehicleService = TestBed.inject(VehiclesService);
    spyOn(vehicleService, 'findByIdVehicle').and.returnValue(of(vehiclesAll[0]));
    spyOn(vehicleService, 'createVehicle').and.returnValue(of(vehiclesAll[0]));
    const router = TestBed.inject(Router);
    spyRouter = spyOn(router, 'navigate');


  });

  it('Init component', () => {
    expect(component).toBeDefined();

    component.ngOnInit();

    expect(component.title).toContain('Update Vehicle');
  });

  it('should loading getVehicleFindBy and patchvalues Forms', () => {


    component.getVehicleFindBy('11');

    expect(component.getVehicleFindBy).toBeDefined();

  });

  it('should resetAll', () => {

    const spy = spyOn(component.form, 'reset');

    component.resetAll();

    expect(spy).toHaveBeenCalled();

  });

  it('onSubmit edit vehicles', async() => {


    component.form.patchValue({
      id: "11",
      plate: "ABC-1152",
      model: "Class C 1.11 Avantgarde Turbo Flex ",
      manufacturer: "Mercedes-Benz",
      color: "black",
      status: true
    });

    spyOn(component['vehiclesService'], 'updateVehicle').and.returnValue(of(
      {
        id: "11",
        plate: "ABC-1152",
        model: "Class C 1.11 Avantgarde Turbo Flex ",
        manufacturer: "Mercedes-Benz",
        color: "black",
        status: true
      }
    ))

    component.onSubmit(null);



    fixture.whenStable().then(() => {
      expect(spyRouter).toHaveBeenCalled();
    })

  });


  it('onSubmit edit vehicles', async() => {
    const spy = spyOn(component['aleloAlertService'], 'messageError');

    component.form.patchValue({
      id: "11",
      plate: "ABC-1152",
      model: "Class C 1.11 Avantgarde Turbo Flex ",
      manufacturer: "Mercedes-Benz",
      color: "black",
      status: true
    });

    spyOn(component['vehiclesService'], 'updateVehicle').and.returnValue(throwError({error: 'error'}))

    component.onSubmit(null);

    fixture.whenStable().then(() => {
      expect(spy).toHaveBeenCalled();
    })

  });

  it('should return page list', () => {

    component.goBack();
    expect(spyRouter).toHaveBeenCalled();

  });


});
