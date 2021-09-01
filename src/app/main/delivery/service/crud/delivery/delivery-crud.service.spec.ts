import { TestBed } from '@angular/core/testing';

import { DeliveryCrudService } from './delivery-crud.service';

describe('DeliveryCrudService', () => {
  let service: DeliveryCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeliveryCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
