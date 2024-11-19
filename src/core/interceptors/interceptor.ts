import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { LoginSessionService } from '../auth/login-session.service';
import { TokenService } from '../auth/token.service';

export const InterceptorOkeconde: HttpInterceptorFn = (req, next) => {
  const loginSessionService = inject(LoginSessionService);
  const authToken = loginSessionService.getToken();
 // Sử dụng inject để lấy TokenService
 const tokenService = inject(TokenService);
 const authToken2 = tokenService.getToken();

 // Clone the request and add the authorization header
 const authReq = req.clone({
   setHeaders: {
     Authorization: `Bearer ${authToken2}`
   }
 });

 // Pass the cloned request with the updated header to the next handler
 return next(authReq);
};
