import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponsListComponent } from './coupons-list.component';

describe('CouponsListComponent', () => {
  let component: CouponsListComponent;
  let fixture: ComponentFixture<CouponsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CouponsListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CouponsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
