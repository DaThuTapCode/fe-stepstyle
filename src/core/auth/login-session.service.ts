import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginSessionService {
    private readonly USER_KEY = 'user';

    getUserIsLogin() {
      const userJson = localStorage.getItem(this.USER_KEY); // Lấy chuỗi JSON từ localStorage
      if (userJson) {
        try {
          return JSON.parse(userJson); // Chuyển chuỗi JSON thành object
        } catch (error) {
          console.error("Error parsing user data:", error);
          return null; // Trả về null nếu parse thất bại
        }
      }
      return null; // Trả về null nếu không có dữ liệu trong localStorage
    }


    checkLogin() : boolean{
      return localStorage.getItem(this.USER_KEY) !== null && localStorage.getItem(this.USER_KEY) !== undefined; // Lấy chuỗi JSON từ localStorage
    }

    getToken() {
      const userJson = localStorage.getItem(this.USER_KEY); // Lấy chuỗi JSON từ localStorage
      if (userJson) {
        try {
          return JSON.parse(userJson).token; // Chuyển chuỗi JSON thành object
        } catch (error) {
          console.error("Error parsing user data:", error);
          return null; // Trả về null nếu parse thất bại
        }
      }
      return null; // Trả về null nếu không có dữ liệu trong localStorage
    }

    /**Đăng xuất */
    logoutUserLogin() {
      localStorage.removeItem(this.USER_KEY);
    }

    
}