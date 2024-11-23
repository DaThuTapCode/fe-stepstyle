import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserLoginResponse } from '../../models/user-login/response/user-login-response';

@Injectable({
  providedIn: 'root'
})
export class SessionloginService {
  private USER_KEY = 'user';
  private userSubject = new BehaviorSubject<UserLoginResponse | any>(this.getUserFromStorage());

  constructor() { }

  user$ = this.userSubject.asObservable();

  setUser(user: UserLoginResponse) {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
    this.userSubject.next(user);
  }

  getUser(): UserLoginResponse {
    return this.userSubject.value;
  }

  clearUser() {
    localStorage.removeItem(this.USER_KEY);
    this.userSubject.next(null);
  }

  getUserRole(): 'ADMIN' | 'EMPLOYEE' | 'CUSTOMER' | null | any{
    const user = this.getUser();
    if(user){
        switch(user.role){
          case 'ADMIN':
            return 'ADMIN';
          case 'EMPLOYEE':
            return 'EMPLOYEE';
          case "CUSTOMER": 
            return 'CUSTOMER'
          default:
            return null;
        }
    }
    return null;
  }

  private getUserFromStorage(): UserLoginResponse {
    const user = localStorage.getItem(this.USER_KEY);
    return user ? JSON.parse(user) : null;
  }
}
