import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CounterSalesComponent } from './counter-sales.component';

describe('CounterSalesComponent', () => {
  let component: CounterSalesComponent;
  let fixture: ComponentFixture<CounterSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CounterSalesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CounterSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
