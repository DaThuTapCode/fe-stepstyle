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

  /**Đường dẫn api đăng nhập của admin */
  private urlAPIEmployeeLogin: string = `${this.baseApiUrl}/api/customer-login/login`;
  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
  ) { }

  /** Gọi api đăng nhập của nhân viên */
  callApiCustomerLogin(userLoginRequest: UserLoginRequest) {
    return this.http.post(this.urlAPIEmployeeLogin, userLoginRequest);
  }

}
