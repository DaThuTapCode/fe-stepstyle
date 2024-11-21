import { TestBed } from '@angular/core/testing';

import { HomeUserService } from './home-user.service';

describe('HomeUserService', () => {
  let service: HomeUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
