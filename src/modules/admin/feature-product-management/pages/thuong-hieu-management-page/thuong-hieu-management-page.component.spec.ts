import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuongHieuManagementPageComponent } from './thuong-hieu-management-page.component';

describe('ThuongHieuManagementPageComponent', () => {
  let component: ThuongHieuManagementPageComponent;
  let fixture: ComponentFixture<ThuongHieuManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThuongHieuManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThuongHieuManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
