import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.scss'
})
export class NotificationComponent implements OnInit{
  notifications: { type: string; message: string }[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notification$.subscribe(notification => {
      this.notifications.push(notification);
      setTimeout(() => this.removeNotification(notification), 2900);
    });
  }

  removeNotification(notification: { type: string; message: string }) {
    this.notifications = this.notifications.filter(n => n !== notification);
  }

  closeNotification(notification: { type: string; message: string }) {
    this.removeNotification(notification);
  }

}
