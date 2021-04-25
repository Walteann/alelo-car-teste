import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

import { VehiclesService } from 'src/app/core/services';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { Vehicle } from 'src/app/shared/models';
import { PipesModule } from 'src/app/shared/pipes/pipes.module';

import { VehiclesTableComponent } from './vehicles-table.component';

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

class MockVehicleService {
  getAllVehicles(): Observable<Vehicle[]> {
    return of(vehiclesAll).pipe(
      delay(500)
    )
  }

  getVehicles(page = 1, limit = 10, filter?: string): Observable<Vehicle[]> {
    return of(vehiclesAll).pipe(
      delay(500)
    )
  }

  findByIdVehicle(id: string): Observable<Vehicle> {
    return of(vehiclesAll[0]).pipe(
      delay(500)
    );
  }

  deleteVehicle(id: string): Observable<Vehicle> {
    return
  }

}

describe('VehiclesTableComponent', () => {

  let component: VehiclesTableComponent;
  let fixture: ComponentFixture<VehiclesTableComponent>;

  let spyRouter;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ComponentsModule,
        PipesModule
      ],
      declarations: [
        VehiclesTableComponent,
      ],
      providers: [
        { provide: VehiclesService, useClass: MockVehicleService}
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(VehiclesTableComponent);
    component = fixture.componentInstance;
  });

  it('should emit edit event', () => {
    const spy = spyOn(component.edit, 'emit');

    component.onEdit('11');

    expect(spy).toHaveBeenCalled();
  });

  it('should emit delete event', () => {
    const spy = spyOn(component.delete, 'emit');

    component.onDelete('11');

    expect(spy).toHaveBeenCalled();
  });

  it('should call pageChoied and currentPage to be 11', () => {

    component.currentPage = 10;

    component.pageChoied(11);

    expect(component.currentPage).toEqual(11);
  });

  it('should call next and array paginate changes', () => {

    component.next();
    expect(component.pagination).toEqual([2, 3, 4, 5, 6]);

    component.next();
    component.next();
    expect(component.pagination).toEqual([4, 5, 6, 7, 8]);

    component.next();
    component.next();
    component.next();
    expect(component.pagination).toEqual([7, 8, 9, 10, 11]);

  });

  it('should call prev and array paginate changes', () => {

    component.next();
    component.next();

    component.prev();

    expect(component.pagination).toEqual([2, 3, 4, 5, 6]);

    component.next();
    component.next();
    component.next();
    component.next();

    component.prev();
    component.prev();

    expect(component.pagination).toEqual([4, 5, 6, 7, 8]);

    component.currentPage = 1;
    component.prev();

    expect(component.pagination).toEqual([4, 5, 6, 7, 8]);

  });

});
