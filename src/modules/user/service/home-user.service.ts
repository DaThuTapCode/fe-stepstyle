import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HomeUserService {
   /** Base url api */
   private baseApiUrl = environment.apiUrl;

   /**Đường dẫn api đăng nhập của admin */
   private urlAPILichSuGiaoDich: string = `${this.baseApiUrl}/api/home-user/lich-su-mua-hang`;
  constructor(private http: HttpClient) { }

  getLichSuGiaoDich() {
    return this.http.get(this.urlAPILichSuGiaoDich);
  }
}
