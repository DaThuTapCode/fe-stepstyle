import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatLieuListComponent } from './chat-lieu-list.component';

describe('ChatLieuListComponent', () => {
  let component: ChatLieuListComponent;
  let fixture: ComponentFixture<ChatLieuListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChatLieuListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChatLieuListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
