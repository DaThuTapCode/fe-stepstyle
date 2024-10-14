import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoiceHistoryManagementPageComponent } from './invoice-history-management-page.component';

describe('InvoiceHistoryManagementPageComponent', () => {
  let component: InvoiceHistoryManagementPageComponent;
  let fixture: ComponentFixture<InvoiceHistoryManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvoiceHistoryManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvoiceHistoryManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
