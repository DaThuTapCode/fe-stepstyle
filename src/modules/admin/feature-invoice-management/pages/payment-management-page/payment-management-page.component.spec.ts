import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentManagementPageComponent } from './payment-management-page.component';

describe('PaymentManagementPageComponent', () => {
  let component: PaymentManagementPageComponent;
  let fixture: ComponentFixture<PaymentManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
