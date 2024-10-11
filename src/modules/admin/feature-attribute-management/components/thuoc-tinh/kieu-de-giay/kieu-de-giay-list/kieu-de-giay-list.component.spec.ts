import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KieuDeGiayListComponent } from './kieu-de-giay-list.component';

describe('KieuDeGiayListComponent', () => {
  let component: KieuDeGiayListComponent;
  let fixture: ComponentFixture<KieuDeGiayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KieuDeGiayListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KieuDeGiayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
