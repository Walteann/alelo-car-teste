import { TestBed } from '@angular/core/testing';

import { ErrorService } from './error.service';

describe('ErrorService', () => {
  let service: ErrorService;

  beforeEach(() => {
    service = TestBed.inject(ErrorService);
  });

  it('should called findByErrorName and return message field is required', () => {
    expect(service.findByErrorName('required')).toEqual('field is required.');
    expect(service.findByErrorName('empty')).toEqual('field is required.');
  });

  it('should called findByErrorName with null and return Null', () => {
    expect(service.findByErrorName(null)).toBeNull();
  });

});
