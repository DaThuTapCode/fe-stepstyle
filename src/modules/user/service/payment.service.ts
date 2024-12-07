import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HoaDonBanOnlineRequest } from '../../../models/hoa-don/request/hoa-don-ban-online-request';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrlApi = environment.apiUrl;

  private urlApiGetDetailProductById: string = `${this.baseUrlApi}/api/san-pham-chi-tiet`;

  private urlApiTaoDonHangOnlineChoMotSanPham: string  = `${this.baseUrlApi}/api/online-sales/tao-hoa-don-mot-san-pham`;

  private urlApiTaoDonHangOnline: string  = `${this.baseUrlApi}/api/online-sales/tao-don-hang`;

  private urlApiCheckSoLuongTruocKhiChuyenTrang: string  = `${this.baseUrlApi}/api/online-sales/check-so-luong-truoc-khi-chuyen-trang`;

  private urlApiLayDanhSachPGGDangHoatDong: string  = `${this.baseUrlApi}/api/online-sales/lay-phieu-giam-gia-hoat-dong`;

  private urlApiHuyDonHangPhiaKhachHang: string = `${this.baseUrlApi}/api/online-sales/khach-hang-huy-hoa-don`;

  private urlApiHuyDonHangPhiaAdmin: string = `${this.baseUrlApi}/api/online-sales/admin-huy-don-hang`;

  constructor(private http: HttpClient) {}

     /**Gọi api lấy sản phẩm chi tiết theo id */
     callApiGetDetailProductById(idDetailProduct: number): Observable<any>{
      return this.http.get<any>(`${this.urlApiGetDetailProductById}/${idDetailProduct}`);
    }


    /** Gọi api tạo đơn hàng cho trường hợp mua ngay 1 sản phẩm */
    callApiTaoDonHangOnlineChoMotSanPham(hoaDonBanOnlineRequest: HoaDonBanOnlineRequest) {
      return this.http.post(this.urlApiTaoDonHangOnlineChoMotSanPham, hoaDonBanOnlineRequest);
    }

    createHoaDon(hoaDonRequest: any): Observable<any> {
      const url = `${this.baseUrlApi}/api/hoa-don/create`;
      return this.http.post<any>(url, hoaDonRequest);
    }

    callApiCheckSoLuongTruocKhiChuyenTrang(hoaDonBanOnlineRequest: HoaDonBanOnlineRequest) {
      return this.http.post(this.urlApiCheckSoLuongTruocKhiChuyenTrang, hoaDonBanOnlineRequest);
    }
    
    callApiLayDanhSachPGGDangHoatDong() {
      return this.http.get(this.urlApiLayDanhSachPGGDangHoatDong);
    }

    callApiTaoDonHangOnline(hoaDonBanOnlineRequest: HoaDonBanOnlineRequest) {
      return this.http.post(this.urlApiTaoDonHangOnline, hoaDonBanOnlineRequest);
    }

    callApiHuyDonHangOPhiaKhachHang(idHoaDon: number, lyDoHuy: string) {
      return this.http.put(`${this.urlApiHuyDonHangPhiaKhachHang}/${idHoaDon}?lyDoHuy=${lyDoHuy}`, null);
    }

    /** Gọi api hủy đơn hàng ở phía admin */
    callApiHuyDonHangPhiaAdmin(idHoaDon: number, lyDoHuy: string){
      return this.http.put(`${this.urlApiHuyDonHangPhiaAdmin}/${idHoaDon}?lyDoHuy=${lyDoHuy}`, null);
    }
    
}
