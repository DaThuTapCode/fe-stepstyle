import { TestBed } from '@angular/core/testing';

import { CounterSalesService } from './counter-sales.service';

describe('CounterSalesService', () => {
  let service: CounterSalesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CounterSalesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
