import { TestBed } from '@angular/core/testing';

import { DeliveryDetailsService } from './delivery-details.service';

describe('DeliveryDetailsService', () => {
  let service: DeliveryDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
