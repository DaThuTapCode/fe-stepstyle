import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsCreateComponent } from './coupons-create.component';

describe('CouponsCreateComponent', () => {
  let component: CouponsCreateComponent;
  let fixture: ComponentFixture<CouponsCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsCreateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
