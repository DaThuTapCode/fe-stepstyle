import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PhieuGiamGiaSearch } from '../../../../models/phieu-giam-gia/request/phieu-giam-gia-search';


@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn api
  private baseUrlApi = environment.apiUrl;
  //Api lấy tất cả danh sách phiếu giảm giá
  private uriApiGetAllCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/get-all`;
  //Api tạo phiếu giảm giá mới
  private uriApiPostCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/create`;
  //Api cập nhật phiếu giảm giá
  private uriApiPutCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/update`;
  //Api xóa phiếu giảm giá
  private uriApiDeleteCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/delete`;
  //Api tìm kiếm, phân trang
  private uriApiPostSearchPageCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/search`;

  getAllCoupons(): Observable<any> {
    return this.http.get<any>(this.uriApiGetAllCoupons);
  }

  postCoupons(data: any): Observable<any> {

    return this.http.post<any>(this.uriApiPostCoupons, data);
  }

  putCoupons(
    data: any,
    idPhieuGiamGia: number
  ): Observable<any> {
    return this.http.put<any>(this.uriApiPutCoupons, data);
  }

  deleteCoupons(
    idPhieuGiamGia: number
  ): Observable<any> {
    return this.http.delete<any>(this.uriApiDeleteCoupons)
  }
 
  /**Tìm kiếm phân trang sản phẩm */
  searchPageCoupons(phieuGiamGiaSearch: PhieuGiamGiaSearch, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.uriApiPostSearchPageCoupons}?page=${page}&size=${size}`, phieuGiamGiaSearch);
  }
}
