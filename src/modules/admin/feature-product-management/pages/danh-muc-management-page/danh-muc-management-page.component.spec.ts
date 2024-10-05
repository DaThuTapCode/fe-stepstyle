import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucManagementPageComponent } from './danh-muc-management-page.component';

describe('DanhMucManagementPageComponent', () => {
  let component: DanhMucManagementPageComponent;
  let fixture: ComponentFixture<DanhMucManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhMucManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
