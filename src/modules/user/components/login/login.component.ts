import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserLoginRequest } from '../../../../models/user-login/request/user-login-request';
import { NotificationComponent } from '../../../../shared/notification/notification.component';
import { NotificationService } from '../../../../shared/notification.service';
import { LoginSessionService } from '../../../../core/auth/login-session.service';
import { TokenService } from '../../../../core/auth/token.service';
import { LoginAndRegisterService } from '../../service/login.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  userLoginRequest: UserLoginRequest = {
    userName: 'NV001',
    password: '130904'
  }

  constructor (
    private loginService: LoginAndRegisterService,
    private notificationService: NotificationService,
    private loginSessionService: LoginSessionService,
    private router: Router,
    private tokenService: TokenService,
  ) {}

  /** Bắt sự kiện đâng nhập của nhân viên */
  submitLogin() {
    if(this.userLoginRequest.userName.length <= 0) {
      this.notificationService.showError("Vui lòng nhập tên đăng nhập");
      return;
    }

    if(this.userLoginRequest.password.length <= 0 ){
      this.notificationService.showError("Vui lòng nhập mật khẩu");
      return;
    }

    /** */
    this.loginService.callApiCustomerLogin(this.userLoginRequest).subscribe({
      next: (response: any) => {
        // Lưu object dưới dạng chuỗi JSON
        localStorage.setItem('user', JSON.stringify(response.data));
        this.notificationService.showSuccess(response.message);
        this.tokenService.setToken(response.data.token);
        this.router.navigate(['/okconde/home']);
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
      }
    });
  }    


  ngOnInit(): void {
    if(this.loginSessionService.checkLogin()) {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
