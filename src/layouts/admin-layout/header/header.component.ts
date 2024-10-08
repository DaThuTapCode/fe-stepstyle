import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  //Biến kiểm tra có đang ở chế độ full màn hình hay không;
  isFullscreen: boolean = false;

  //Biến đường dẫn ảnh user đã đăng nhập;
  imgUserIsLogin = 'user_TP.png'


  handleFullScreen() {
    const elem = document.documentElement as HTMLElement;

    if (!this.isFullscreen) {
      // Nếu chưa ở chế độ toàn màn hình, vào chế độ toàn màn hình
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      }
    } else {
      // Nếu đang ở chế độ toàn màn hình, thoát chế độ toàn màn hình
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    // Đổi trạng thái
    this.isFullscreen = !this.isFullscreen;
  }

  constructor() {
    // Lắng nghe sự kiện thay đổi chế độ toàn màn hình
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  }
}
