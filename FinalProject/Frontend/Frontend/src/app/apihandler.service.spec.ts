import { TestBed } from '@angular/core/testing';

import { APIHandlerService } from './apihandler.service';

describe('APIHandlerService', () => {
  let service: APIHandlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APIHandlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
