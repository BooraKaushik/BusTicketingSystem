import { TestBed } from '@angular/core/testing';

import { StoreUserLocallyService } from './store-user-locally.service';

describe('StoreUserLocallyService', () => {
  let service: StoreUserLocallyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StoreUserLocallyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
