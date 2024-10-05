import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductManagementPageComponent } from './product-management-page.component';

describe('ProductManagementPageComponent', () => {
  let component: ProductManagementPageComponent;
  let fixture: ComponentFixture<ProductManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
