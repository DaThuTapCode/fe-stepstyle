import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoanhThuNgayComponent } from './doanh-thu-ngay.component';

describe('DoanhThuNgayComponent', () => {
  let component: DoanhThuNgayComponent;
  let fixture: ComponentFixture<DoanhThuNgayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoanhThuNgayComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoanhThuNgayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
