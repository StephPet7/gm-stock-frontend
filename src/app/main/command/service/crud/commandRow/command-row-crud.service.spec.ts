import { TestBed } from '@angular/core/testing';

import { CommandRowCrudService } from './command-row-crud.service';

describe('CommandRowCrudService', () => {
  let service: CommandRowCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandRowCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
