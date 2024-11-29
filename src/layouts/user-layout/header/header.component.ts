import { Component } from '@angular/core';
import { UserLoginResponse } from '../../../models/user-login/response/user-login-response';
import { SessionloginService } from '../../../core/auth/sessionlogin.service';
import { Router, RouterModule } from '@angular/router';
import { TokenService } from '../../../core/auth/token.service';
import { NotificationService } from '../../../shared/notification.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../../modules/user/service/cart.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
//Biến đường dẫn ảnh user đã đăng nhập;

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
    private notificationService: NotificationService,
    private cartService: CartService,
  ) {}
  cartItemCount: number = 0;

   checkLogin() : boolean {
    // console.log('keke',this.sessionLoginService.getUser());
    return this.sessionLoginService.getUser() !== null &&  this.sessionLoginService.getUser() !== undefined;
  }

  fethUserIsLogin() {
    this.userIsLogin = this.sessionLoginService.getUser();
  }

  /** bắt sự kiện logout */
  handleLogout() {
    let check = confirm('Bạn có muốn logout?');
    if (check) {
      this.userIsLogin = new UserLoginResponse();
      this.sessionLoginService.clearUser();
      this.tokenService.removeToken();
      this.notificationService.showSuccess('Logout thành công!');
      this.router.navigate(['/okconde/login']);
    }
  }

  handleNavigateLogin() {
    this.router.navigate(['/login']);
  }
    
  ngOnInit(): void {
    this.sessionLoginService.user$.subscribe(user => {
      this.userIsLogin = user;
    });
    this.cartService.cartItemCount$.subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
