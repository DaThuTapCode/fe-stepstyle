import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseUrl: string = environment.apiUrl;

  /**Đường dẫn api lấy doanh thu ngày */
  urlApiLayDoanhThuNgay: string = `${this.baseUrl}/api/dashboard/doanh-thu-ngay-hom-nay`;

  /**Đường dẫn api lấy doanh thu thánh */
  urlApiLayDoanhThuThang: string = `${this.baseUrl}/api/dashboard/doanh-thu-thang-hien-tai`;

  /**Đường dẫn api lấy doanh thu năm */
  urlApiLayDoanhThuNam: string = `${this.baseUrl}/api/dashboard/doanh-thu-nam-hien-tai`;


  constructor(
    private http: HttpClient
  ) { }



  /** Gọi api lấy doanh thu ngày */
  callAPILayDoanhThuNgay() {
    return this.http.get(`${this.urlApiLayDoanhThuNgay}`);
  }
  
  /** Gọi api lấy doanh thu tháng */
  callAPILayDoanhThuThang() {
    return this.http.get(`${this.urlApiLayDoanhThuThang}`);
  }

  /** Gọi api lấy doanh thu năm */
  callAPILayDoanhThuNam() {
    return this.http.get(`${this.urlApiLayDoanhThuNam}`);
  }

}
