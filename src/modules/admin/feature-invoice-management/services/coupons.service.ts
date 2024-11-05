import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PhieuGiamGiaSearch } from '../../../../models/phieu-giam-gia/request/phieu-giam-gia-search';
import { data } from 'jquery';


@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn api
  private baseUrlApi = environment.apiUrl;

  //GET
  //Api lấy tất cả danh sách phiếu giảm giá
  private uriApiGetAllCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/get-all`;
  //Api tìm kiếm theo id
  private uriApiCouponsById: string = `${this.baseUrlApi}/api/phieu-giam-gia`;
  //Api số lượng phiếu giảm giá theo trạng thái
  private uriApiGetCouponsCount: string = `${this.baseUrlApi}/api/phieu-giam-gia/count`;
  //Api chuyển trạng thái phiếu giảm giá về hết hạn khi qua ngày kết thúc
  private uriApiExpiredActiveCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/expired-active-coupons`;

  //POST
  //Api tạo phiếu giảm giá mới
  private uriApiPostCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/create`;
  //Api tìm kiếm, phân trang
  private uriApiPostSearchPageCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/search`;

  //PUT
  //Api cập nhật phiếu giảm giá
  private uriApiPutCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/update`;
  //Api kết thúc nhanh phiếu giảm giá
  private uriApiEndPromotionCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/end-promotion`;

  //DELETE
  //Api xóa phiếu giảm giá
  private uriApiDeleteCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/delete`;
  
  
  
  /**Lấy danh sách phiếu giảm giá */
  getAllCoupons(): Observable<any> {
    return this.http.get<any>(this.uriApiGetAllCoupons);
  }

  /** Tìm kiếm theo Id */
  getCouponsById(
    idPhieuGiamGia: number
  ): Observable<any> {
    return this.http.get<any>(`${this.uriApiCouponsById}/${idPhieuGiamGia}`);
  }

  /** Lấy số lượng phiếu giảm giá theo trạng thái */
  getCouponsCount(): Observable<any> {
    return this.http.get<any>(this.uriApiGetCouponsCount);
  }

  /**Chuyển trạng thái hết hạn khi đến ngày kết thúc */
  getExpiredActiveCoupons(): Observable<any> {
    return this.http.get<any>(this.uriApiExpiredActiveCoupons);
  }

  /**Thêm mới phiếu giảm giá */
  postCoupons(data: any): Observable<any> {
    return this.http.post<any>(this.uriApiPostCoupons, data);
  }

  /**Tìm kiếm phân trang phiếu giảm giá */
  searchPageCoupons(phieuGiamGiaSearch: PhieuGiamGiaSearch, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.uriApiPostSearchPageCoupons}?page=${page}&size=${size}`, phieuGiamGiaSearch);
  }

  /**Cập nhật phiếu giảm giá */
  putCoupons(
    idPhieuGiamGia: number,
    data: any
  ): Observable<any> {
    return this.http.put<any>(`${this.uriApiPutCoupons}/${idPhieuGiamGia}`, data);
  }

  endPromotion(
    idPhieuGiamGia: number,
    data: any
  ): Observable<any> {
    return this.http.put<any>(`${this.uriApiEndPromotionCoupons}/${idPhieuGiamGia}`, data);
  }

  /**Xóa phiếu giảm giá */
  deleteCoupons(
    idPhieuGiamGia: number
  ): Observable<any> {
    return this.http.delete<any>(`${this.uriApiDeleteCoupons}/${idPhieuGiamGia}`);
  }
  
}
