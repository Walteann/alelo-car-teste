import { TestBed } from '@angular/core/testing';

import { ToastrService } from 'ngx-toastr';

import { AleloAlertService } from './alelo-alert.service';

const mockToastrService = {
  success(message, title?) {},
  error(message, title) {}
}

describe('AleloAlertService', () => {
  let service: AleloAlertService;

  let spyToastrSuccess;
  let spyToastrError;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        {provide: ToastrService, useValue: mockToastrService}
      ]
    }).compileComponents();
    service = TestBed.inject(AleloAlertService);
    const toastr = TestBed.inject(ToastrService);
    spyToastrSuccess = spyOn(toastr, 'success');
    spyToastrError = spyOn(toastr, 'error');

  });

  it('should messageSuccess is called with toastr success', () => {
    service.messageSuccess('hello world');
    expect(spyToastrSuccess).toHaveBeenCalled();
  });

  it('should messageError is called with toastr error', () => {
    service.messageError('Error Message');
    expect(spyToastrError).toHaveBeenCalled();
  });

});
