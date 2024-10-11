import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KichCoListComponent } from './kich-co-list.component';

describe('KichCoListComponent', () => {
  let component: KichCoListComponent;
  let fixture: ComponentFixture<KichCoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KichCoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KichCoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
