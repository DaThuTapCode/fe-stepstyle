import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { UserLoginRequest } from '../../../../models/user-login/request/user-login-request';
import { NotificationService } from '../../../../shared/notification.service';

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
  ) { }

  /** Gọi api đăng nhập của nhân viên */
  callApiEmployeeLogin(userLoginRequest: UserLoginRequest) {
    return this.http.post(this.urlAPIEmployeeLogin, userLoginRequest);
  }

}
