import { VehiclesService } from 'src/app/core/services';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { VehiclesListComponent } from './vehicles-list.component';
import { VehiclesTableComponent } from '../shared/vehicles-table/vehicles-table.component';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';
import { HttpClientModule } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { Observable, of, throwError, BehaviorSubject } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { Vehicle } from 'src/app/shared/models';

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

const mockToastrService = {
  success(message, title) {},
  error(message, title) {}
}

describe('VehiclesListComponent', () => {

  let component: VehiclesListComponent;
  let fixture: ComponentFixture<VehiclesListComponent>;

  let spyRouter;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        PipesModule
      ],
      declarations: [
        VehiclesListComponent,
        VehiclesTableComponent,
      ],
      providers: [
        {provide: ToastrService, useValue: mockToastrService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(VehiclesListComponent);
    component = fixture.componentInstance;

    const router = TestBed.inject(Router);
    spyRouter = spyOn(router, 'navigate');
    const vehicleService = TestBed.inject(VehiclesService);
    spyOn(vehicleService, 'getAllVehicles').and.returnValue(of(vehiclesAll));
    spyOn(vehicleService, 'getVehicles').and.returnValue(of(vehiclesAll));
    spyOn(vehicleService, 'findByIdVehicle').and.returnValue(of(vehiclesAll[0]));

  });

  it('should called onAdd and router navigate is called', () => {
    component.onAdd();
    expect(spyRouter).toHaveBeenCalled();
  });

  it('should called onEdit and router navigate is called', () => {
    component.onEdit('11');
    expect(spyRouter).toHaveBeenCalled();
  });

  it('should called onModalDelete and idDelete is 11', () => {
    component.idDelete = null;
    component.onModalDelete('11');
    expect(component.idDelete).toEqual('11');
  });

  it('should called onConfirmDelete and idDelete is null', () => {
    const vehicleService = TestBed.inject(VehiclesService);
    spyOn(vehicleService, 'deleteVehicle').and.returnValue(of(null));
    component.onConfirmDelete('11');
    expect(component.idDelete).toBeNull();
  });

  it('should called onConfirmDelete and idDelete init with 11 but expect to be null', () => {
    component.idDelete = '11';
    component.onConfirmDelete(null);
    expect(component.idDelete).toBeNull();
  });

  it('ngOnInit loading list vehicles', () => {
    component.ngOnInit();
    component.vehicles$.pipe(
      delay(500)
    ).subscribe(data => {
      expect(data).toEqual(vehiclesAll);
    });
  });

  it('should call searchPlate without params and loading list vehicles', () => {
    component.searchPlate();
    component.vehicles$.pipe(
      delay(500)
    ).subscribe(data => {
      expect(data).toEqual(vehiclesAll);
    });

  });

  it('should pageChange load list vehicles with paginate 2', () => {
    const spy = spyOn(component, 'searchPlate');
    component.pageChange(2);
    expect(spy).toHaveBeenCalled();
  });

  it('should pageChange NOT load list vehicles with paginate', () => {
    const spy = spyOn(component, 'searchPlate');
    component.pageChange(null);
    expect(spy).not.toHaveBeenCalled();
  });

  it('should deleteVehicle catch Error Observable', () => {
    const vehicleService = TestBed.inject(VehiclesService);
    spyOn(vehicleService, 'deleteVehicle').and.returnValue(throwError({error: 'error'}));

    const spy = spyOn(component['aleloAlertService'], 'messageError');
    component.onConfirmDelete('11');
    expect(spy).toHaveBeenCalled();
  });

});
