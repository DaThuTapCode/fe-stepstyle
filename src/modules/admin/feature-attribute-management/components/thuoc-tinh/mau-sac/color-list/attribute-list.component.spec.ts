import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AttributeListComponent } from './attribute-list.component';

describe('AttributeListComponent', () => {
  let component: AttributeListComponent;
  let fixture: ComponentFixture<AttributeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AttributeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AttributeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
