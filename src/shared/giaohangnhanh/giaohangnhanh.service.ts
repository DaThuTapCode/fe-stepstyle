import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GiaoHangNhanhService {
    // Đường dẫn cơ sở cho API GHN
    private apiBaseUrl: string = 'https://dev-online-gateway.ghn.vn/shiip/public-api/master-data';
    private apiGetTinhThanhs: string = `${this.apiBaseUrl}/province`;
    private apiGetDistricts: string = `${this.apiBaseUrl}/district`;
    private apiGetCommunes: string = `${this.apiBaseUrl}/ward`;
    private tokenGHN: string = 'fa2d7a1d-92d3-11ef-8e53-0a00184fe694'; // Token của GHN

    constructor(private http: HttpClient) {}

    // Hàm lấy danh sách tỉnh/thành
    getTinhThanhs() {
        const headers = new HttpHeaders().set('Token', this.tokenGHN);
        return this.http.get(this.apiGetTinhThanhs, { headers });
    }

    // Hàm lấy danh sách huyện dựa trên tỉnh/thành đã chọn
    getQuanHuyen(province: any) {
        const headers = new HttpHeaders().set('Token', this.tokenGHN);
        return this.http.post(`${this.apiGetDistricts}`,province, { headers });
    }

    // Hàm lấy danh sách xã dựa trên huyện đã chọn
    getPhuongXa(district: any) {
        const headers = new HttpHeaders().set('Token', this.tokenGHN);
        return this.http.post(`${this.apiGetCommunes}`, district ,{ headers });
    }
}
