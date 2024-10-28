import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GiaoHangNhanhService {

    constructor(
        private http: HttpClient
    ){}
  
    // Đường dẫn cơ sở
    apiBaseUrl: string = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data';
    apiGetTinhThanhs: string = `${this.apiBaseUrl}/province`;
    tokenGHN: string = 'fa2d7a1d-92d3-11ef-8e53-0a00184fe694'; // Token của GHN
    /**
     * Hàm gọi API lấy tỉnh thành của GHN
     */
    getTinhThanhs(){
        const headers = new HttpHeaders().set('Token', this.tokenGHN);
        return this.http.get(this.apiGetTinhThanhs, {headers})
    }
}
