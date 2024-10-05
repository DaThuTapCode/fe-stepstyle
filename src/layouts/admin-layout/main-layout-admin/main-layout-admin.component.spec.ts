import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainLayoutAdminComponent } from './main-layout-admin.component';

describe('MainLayoutAdminComponent', () => {
  let component: MainLayoutAdminComponent;
  let fixture: ComponentFixture<MainLayoutAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainLayoutAdminComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainLayoutAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
