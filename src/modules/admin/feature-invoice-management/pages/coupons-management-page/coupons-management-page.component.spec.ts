import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsManagementPageComponent } from './coupons-management-page.component';

describe('CouponsManagementPageComponent', () => {
  let component: CouponsManagementPageComponent;
  let fixture: ComponentFixture<CouponsManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
