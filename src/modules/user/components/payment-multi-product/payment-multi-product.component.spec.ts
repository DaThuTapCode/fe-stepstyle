import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentMultiProductComponent } from './payment-multi-product.component';

describe('PaymentMultiProductComponent', () => {
  let component: PaymentMultiProductComponent;
  let fixture: ComponentFixture<PaymentMultiProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentMultiProductComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentMultiProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
