import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SessionloginService } from '../auth/sessionlogin.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {
  const router = inject(Router);
  const sessionLoginService = inject(SessionloginService);
  const isLoggedIn = !!sessionLoginService.getUser(); // Kiểm tra đăng nhập
  const userRole = sessionLoginService.getUserRole(); // Lấy vai trò người dùng
  
  if (isLoggedIn) {
    const requiredRoles = route.data['role'] as string[]; // Mảng vai trò yêu cầu cho route
    if (requiredRoles && requiredRoles.length > 0) {
      if (requiredRoles.includes(userRole)) {
        return true; // Nếu vai trò người dùng nằm trong danh sách, cho phép truy cập
      } else {
        return router.createUrlTree(['/404']); // Điều hướng nếu không có quyền
      }
    }
    return true; // Nếu không chỉ định role, mặc định cho phép truy cập
  } else {
    return router.createUrlTree(['/404']); // Điều hướng nếu chưa đăng nhập
  }
};

