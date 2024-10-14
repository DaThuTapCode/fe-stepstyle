import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceDetailManagementPageComponent } from './invoice-detail-management-page.component';

describe('InvoiceDetailManagementPageComponent', () => {
  let component: InvoiceDetailManagementPageComponent;
  let fixture: ComponentFixture<InvoiceDetailManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceDetailManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceDetailManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
