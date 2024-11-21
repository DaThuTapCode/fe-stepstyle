import { Component, OnInit } from '@angular/core';
import { UserLoginResponse } from '../../../models/user-login/response/user-login-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { SessionloginService } from '../../../core/auth/sessionlogin.service';
import { TokenService } from '../../../core/auth/token.service';
import { NotificationService } from '../../../shared/notification.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

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
    private sessionLoginService: SessionloginService,
    private router: Router,
    private tokenService: TokenService,
    private notificationService: NotificationService
  ) {}

  checkLogin() : boolean {
    return this.sessionLoginService.getUser() !== null &&  this.sessionLoginService.getUser() !== undefined;
  }

  fethUserIsLogin() {
    this.userIsLogin = this.sessionLoginService.getUser();
  }

  /** bắt sự kiện logout */
  handleLogout() {
    let check = confirm('Bạn có muốn logout?');
    if (check) {
      this.userIsLogin = new UserLoginResponse;
      this.sessionLoginService.clearUser();
      this.tokenService.removeToken();
      this.notificationService.showSuccess('Logout thành công!');
      this.router.navigate(['/login']);
    }
  }

  handleNavigateLogin() {
    this.router.navigate(['/login']);
  }
    
  ngOnInit(): void {
    this.fethUserIsLogin();
  }
}
