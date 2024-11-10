import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
//Biến đường dẫn ảnh user đã đăng nhập;
  imgUserIsLogin = 'user_TP.png';
}
