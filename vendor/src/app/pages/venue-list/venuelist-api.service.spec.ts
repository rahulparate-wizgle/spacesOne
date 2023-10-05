import { TestBed } from '@angular/core/testing';

import { VenuelistApiService } from './venuelist-api.service';

describe('VenuelistApiService', () => {
  let service: VenuelistApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VenuelistApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
