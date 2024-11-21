import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserLoginRequest } from '../../../../models/user-login/request/user-login-request';
import { NotificationService } from '../../../../shared/notification.service';
import { SessionloginService } from '../../../../core/auth/sessionlogin.service';
import { Router } from '@angular/router';
import { TokenService } from '../../../../core/auth/token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {

  /** Base url api */
  private baseApiUrl = environment.apiUrl;

  /**Đường dẫn api đăng nhập của admin */
  private urlAPIEmployeeLogin: string = `${this.baseApiUrl}/api/employee-login/login`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private loginSessionService: SessionloginService,
    private router: Router,
    private tokenService: TokenService
  ) { }

  /** Gọi api đăng nhập của nhân viên */
  callApiEmployeeLogin(userLoginRequest: UserLoginRequest) {
     this.http.post(this.urlAPIEmployeeLogin, userLoginRequest).subscribe({
      next: (response: any) => {
        try {
          console.log(response);
          const token = response.data.token;
          this.tokenService.setToken(token);
          this.loginSessionService.setUser(response.data);
          console.log(response.data);
          this.notificationService.showSuccess('Đăng nhập thành công!');
          if(response.data.role === "ADMIN"){
            this.router.navigate(["/admin/dashboard"])
            return;
          }else if(response.data.role === "EMPLOYEE"){
            this.router.navigate(["/admin/counter-sales"]);
            return;
          }
           this.router.navigate(["/okconde/home"]);
        } catch (error) {
          this.notificationService.showError('Đăng nhập thất bại!');
          console.error('Error parsing response:', error);
        }
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
      }
    });;
  }

}
