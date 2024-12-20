import { Component, OnInit } from '@angular/core';
import { UserLoginRequest } from '../../../../../models/user-login/request/user-login-request';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginAndRegisterService } from '../../service/login.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { NotificationComponent } from "../../../../../shared/notification/notification.component";
import { Router } from '@angular/router';
import { SessionloginService } from '../../../../../core/auth/sessionlogin.service';
import { TokenService } from '../../../../../core/auth/token.service';

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
    private loginSessionService: SessionloginService,
    private router: Router,
    private tokenService: TokenService
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
    this.loginService.callApiEmployeeLogin(this.userLoginRequest);
  }    


  ngOnInit(): void {
    if(this.loginSessionService.getUserRole() === 'ADMIN') {
      this.router.navigate(['/admin/dashboard']);
    }
  }
}
