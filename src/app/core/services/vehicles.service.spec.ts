import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { environment } from 'src/environments/environment';

import { VehiclesService } from './vehicles.service';

const API_URL = environment.apiUrl;

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

describe('VehiclesService', () => {
  let service: VehiclesService;
  let httpTestingController: HttpTestingController;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ]
    }).compileComponents();
    service = TestBed.inject(VehiclesService);

    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should return all vehicles getAllVehicles', () => {

    service.getAllVehicles().subscribe(data => {
      expect(data).toEqual(vehiclesAll);
    });

    const req = httpTestingController.expectOne(API_URL + '/vehicle');

    expect(req.request.method).toEqual('GET');

    req.flush(vehiclesAll);
  });

  it('you must make a request and return the list of paged vehicles', () => {

    service.getVehicles(1, 2).subscribe(data => {
      expect(data.length).toEqual(2);
    });

    service.getVehicles().subscribe(data => {
      expect(data.length).toEqual(2);
    });


    const req = httpTestingController.expectOne(API_URL + '/vehicle?page=1&limit=2');

    expect(req.request.method).toEqual('GET');

    req.flush(vehiclesAll);

  });

  it('you must make a request and return the list of paged vehicles WITH filter=ABC', () => {

    service.getVehicles(1, 2, 'ABC').subscribe(data => {
      expect(data.length).toEqual(2);
    });

    const req = httpTestingController.expectOne(API_URL + '/vehicle?page=1&limit=2&filter=ABC');

    expect(req.request.method).toEqual('GET');

    req.flush(vehiclesAll);

  });

  it('should create one vehicle with method POST', () => {

    service.createVehicle(vehiclesAll[0]).subscribe(data => {
      expect(data).toEqual(vehiclesAll[0]);
    });

    const req = httpTestingController.expectOne(API_URL + '/vehicle');

    expect(req.request.method).toEqual('POST');

    req.flush(vehiclesAll[0]);

  });

  it('should update one vehicle with method PUT', () => {

    service.updateVehicle('10', vehiclesAll[0]).subscribe(data => {
      expect(data).toEqual(vehiclesAll[0]);
    });

    const req = httpTestingController.expectOne(API_URL + '/vehicle/10');

    expect(req.request.method).toEqual('PUT');

    req.flush(vehiclesAll[0]);

  });

  it('should find one vehicle with id', () => {

    service.findByIdVehicle('10').subscribe(data => {
      expect(data).toEqual(vehiclesAll[0]);
    });

    const req = httpTestingController.expectOne(API_URL + '/vehicle/10');

    expect(req.request.method).toEqual('GET');

    req.flush(vehiclesAll[0]);

  });

  it('should delete one vehicle', () => {

    service.deleteVehicle('10').subscribe(data => {
      expect(data).toEqual(null);
    });

    const req = httpTestingController.expectOne(API_URL + '/vehicle/10');

    expect(req.request.method).toEqual('DELETE');

    req.flush(null);

  });


});
