import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailManagementPageComponent } from './product-detail-management-page.component';

describe('ProductDetailManagementPageComponent', () => {
  let component: ProductDetailManagementPageComponent;
  let fixture: ComponentFixture<ProductDetailManagementPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetailManagementPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDetailManagementPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
