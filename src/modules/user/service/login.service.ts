import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../shared/notification.service';
import { environment } from '../../../environments/environment';
import { UserLoginRequest } from '../../../models/user-login/request/user-login-request';

@Injectable({
  providedIn: 'root'
})
export class LoginAndRegisterService {

  /** Base url api */
  private baseApiUrl = environment.apiUrl;

  /**Đường dẫn api đăng nhập của khách hàng */
  private urlAPIEmployeeLogin: string = `${this.baseApiUrl}/api/customer-login/login`;

  /**Đường dẫn api đăng ký tài khoản khách hàng*/
  private urlAPIEmployeeRegister: string = `${this.baseApiUrl}/api/customer-login/register`;

  
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  /** Gọi api đăng nhập của khách hành*/
  callApiCustomerLogin(userLoginRequest: UserLoginRequest) {
    return this.http.post(this.urlAPIEmployeeLogin, userLoginRequest);
  }

  /**Gọi api đăng ký tài khoản */
  callApiCustomerRegister(userLoginRequest: UserLoginRequest) {
    return this.http.post(this.urlAPIEmployeeRegister, userLoginRequest);
  }
  

}
