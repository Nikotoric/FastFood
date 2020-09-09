import { TestBed } from '@angular/core/testing';

import { NarudzbaService } from './narudzba.service';

describe('NarudzbaService', () => {
  let service: NarudzbaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NarudzbaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
