import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThuongHieuListComponent } from './thuong-hieu-list.component';

describe('ThuongHieuListComponent', () => {
  let component: ThuongHieuListComponent;
  let fixture: ComponentFixture<ThuongHieuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ThuongHieuListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThuongHieuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
