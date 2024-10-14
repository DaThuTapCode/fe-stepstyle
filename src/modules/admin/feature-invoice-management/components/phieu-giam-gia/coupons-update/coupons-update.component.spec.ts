import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsUpdateComponent } from './coupons-update.component';

describe('CouponsUpdateComponent', () => {
  let component: CouponsUpdateComponent;
  let fixture: ComponentFixture<CouponsUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsUpdateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
