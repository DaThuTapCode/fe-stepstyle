import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from "../footer/footer.component";
import { NotificationComponent } from "../../../shared/notification/notification.component";

@Component({
  selector: 'app-main-layout-user',
  standalone: true,
  imports: [HeaderComponent, RouterOutlet, FooterComponent, NotificationComponent],
  templateUrl: './main-layout-user.component.html',
  styleUrl: './main-layout-user.component.scss'
})
export class MainLayoutUserComponent {

}
