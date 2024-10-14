import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsDetailComponent } from './coupons-detail.component';

describe('CouponsDetailComponent', () => {
  let component: CouponsDetailComponent;
  let fixture: ComponentFixture<CouponsDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
