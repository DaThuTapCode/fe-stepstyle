import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhMucListComponent } from './danh-muc-list.component';

describe('DanhMucListComponent', () => {
  let component: DanhMucListComponent;
  let fixture: ComponentFixture<DanhMucListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DanhMucListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DanhMucListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
