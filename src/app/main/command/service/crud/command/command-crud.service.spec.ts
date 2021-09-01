import { TestBed } from '@angular/core/testing';

import { CommandCrudService } from './command-crud.service';

describe('CommandCrudService', () => {
  let service: CommandCrudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommandCrudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
