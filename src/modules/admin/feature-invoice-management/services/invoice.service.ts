import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HoaDonSearch } from '../../../../models/hoa-don/request/hoa-don-search';


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn API
  private baseUrlApi = environment.apiUrl;
  //Api lấy tất cả danh sách hóa đơn
  private uriApiGetAllInvoice: string = `${this.baseUrlApi}/api/hoa-don/get-all`;
  //Api cập nhật hóa đơn
  private uriApiPutUpdateInvoice: string = `${this.baseUrlApi}/api/hoa-don/update`;
  //Api tìm kiếm theo Id
  private uriApiGetInvoiceById: string = `${this.baseUrlApi}/api/hoa-don`;
  //Api tìm kiếm và phân trang hóa đơn
  private uriApiPostSearchPageInvoice: string = `${this.baseUrlApi}/api/hoa-don/search`;
 

  // Hàm call Api để lấy danh sách hóa đơn
  getAllInvoice(): Observable<any> {
    return this.http.get<any>(this.uriApiGetAllInvoice);
  }

  // Hàm call Api cập nhật hóa đơn
  putUpdateInvoice(
    idHoaDon: number,
    data: any
  ): Observable<any> {
    return this.http.put<any>(`${this.uriApiPutUpdateInvoice}/${idHoaDon}`, data);
  }

  // Hàm call Api chi tiết hóa đơn
  getInvoiceById(
    idHoaDon: number,
  ): Observable<any> {
    return this.http.get<any>(`${this.uriApiGetInvoiceById}/${idHoaDon}`);
  }

  /**Tìm kiếm phân trang hóa đơn */
  searchPageInvoice(hoaDonSearch: HoaDonSearch, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.uriApiPostSearchPageInvoice}?page=${page}&size=${size}`, hoaDonSearch);
  }

}
