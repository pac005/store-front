import { TestBed } from '@angular/core/testing';

import { SharevariableService } from './sharevariable.service';

describe('SharevariableService', () => {
  let service: SharevariableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharevariableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
