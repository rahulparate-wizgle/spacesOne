import { TestBed } from '@angular/core/testing';

import { EnquirylistApiService } from './enquirylist-api.service';

describe('EnquirylistApiService', () => {
  let service: EnquirylistApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EnquirylistApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
