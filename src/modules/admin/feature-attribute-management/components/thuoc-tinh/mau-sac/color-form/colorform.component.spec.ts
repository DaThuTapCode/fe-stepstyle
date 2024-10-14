import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorformComponent } from './colorform.component';

describe('ColorformComponent', () => {
  let component: ColorformComponent;
  let fixture: ComponentFixture<ColorformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ColorformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ColorformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
