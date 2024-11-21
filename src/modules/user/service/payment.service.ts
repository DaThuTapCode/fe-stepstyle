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
    
}
