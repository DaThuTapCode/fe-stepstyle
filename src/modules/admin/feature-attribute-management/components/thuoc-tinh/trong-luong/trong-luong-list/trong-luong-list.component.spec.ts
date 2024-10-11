import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrongLuongListComponent } from './trong-luong-list.component';

describe('TrongLuongListComponent', () => {
  let component: TrongLuongListComponent;
  let fixture: ComponentFixture<TrongLuongListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TrongLuongListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrongLuongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
