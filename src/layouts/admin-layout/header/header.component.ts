import { Component, OnInit } from '@angular/core';
import { LoginSessionService } from '../../../core/auth/login-session.service';
import { UserLoginResponse } from '../../../models/user-login/response/user-login-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/auth/token.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  /** */


  //Biến kiểm tra có đang ở chế độ full màn hình hay không;
  isFullscreen: boolean = false;

  //Biến đường dẫn ảnh user đã đăng nhập;
  imgUserIsLogin = 'user_TP.png'

  userIsLogin: UserLoginResponse = {
    id: 0,
    fullName: '',
    userName: '',
    token: '',
    role: ''
  }

  constructor(
    private loginSession: LoginSessionService,
    private router: Router,
    private tokenService: TokenService,
  ) {
    // Lắng nghe sự kiện thay đổi chế độ toàn màn hình
    document.addEventListener('fullscreenchange', () => {
      this.isFullscreen = !!document.fullscreenElement;
    });
  }

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

  checkLogin() : boolean {
    return this.loginSession.checkLogin();
  }

  fethUserIsLogin() {
    this.userIsLogin = this.loginSession.getUserIsLogin();
  }

  /** bắt sự kiện logout */
  handleLogout() {
    this.loginSession.logoutUserLogin();
    this.tokenService.removeToken();
    if(!this.checkLogin()) {
      this.router.navigate(['/login'])
    }
  }

  handleNavigateLogin() {
    this.router.navigate(['/login']);
  }
    
  ngOnInit(): void {
    this.fethUserIsLogin();
  }
}
