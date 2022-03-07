import { TestBed } from '@angular/core/testing';

import { IDEService } from './ide.service';

describe('IDEService', () => {
  let service: IDEService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IDEService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
