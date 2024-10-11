import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLieuDeGiayListComponent } from './chat-lieu-de-giay-list.component';

describe('ChatLieuDeGiayListComponent', () => {
  let component: ChatLieuDeGiayListComponent;
  let fixture: ComponentFixture<ChatLieuDeGiayListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLieuDeGiayListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatLieuDeGiayListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
