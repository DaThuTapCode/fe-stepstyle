import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PayMentHistoryComponent } from './pay-ment-history.component';

describe('PayMentHistoryComponent', () => {
  let component: PayMentHistoryComponent;
  let fixture: ComponentFixture<PayMentHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PayMentHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PayMentHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
