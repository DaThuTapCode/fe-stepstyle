import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { HoaDonSearch } from '../../../../models/hoa-don/request/hoa-don-search';
import { StatusHD } from '../../../../shared/status-hd';


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
  //Api tạo mới hóa đơn
  private uriApiPostCreateInvoice: string = `${this.baseUrlApi}/api/hoa-don/create`;
  //Api cập nhật hóa đơn
  private uriApiPutUpdateInvoice: string = `${this.baseUrlApi}/api/hoa-don/update`;
  //Api tìm kiếm theo Id
  private uriApiGetInvoiceById: string = `${this.baseUrlApi}/api/hoa-don`;
  //Api tìm kiếm và phân trang hóa đơn
  private uriApiPostSearchPageInvoice: string = `${this.baseUrlApi}/api/hoa-don/search`;
  //Api lấy số lượng hóa đơn theo trạng thái
  private uriApiGetInvoiceCount: string = `${this.baseUrlApi}/api/hoa-don/count`;

  /**ĐƯờng dẫn api hủy hóa đơn online */
  private urlApiCancelInvoiceOnline: string = `${this.baseUrlApi}/api/hoa-don/huy-hoa-don-online`;

  /**ĐƯờng dẫn api thay đổi trạng thái hóa đơn  */
  private urlApiChangeInvoiceStatus: string = `${this.baseUrlApi}/api/hoa-don/thay-doi-trang-thai-hoa-don-online`;

  // Hàm call Api để lấy danh sách hóa đơn
  getAllInvoice(): Observable<any> {
    return this.http.get<any>(`${this.uriApiGetAllInvoice}`);
  }

  // Hàm call Api tạo mới hóa đơn
  postCreateInvoice(
    data: any
  ): Observable<any> {
    return this.http.post<any>(`${this.uriApiPostCreateInvoice}`, data);
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

  /** Hàm lấy số lượng hóa đơn theo trạng thái */
  getInvoiceCountByStatus(): Observable<any> {
    return this.http.get<any>(this.uriApiGetInvoiceCount);
  }

  /**Gọi api hủy hóa đơn bán hàng online */
  callApiCancelInvoiceOnlineSales(idHoaDon: number) {
    return this.http.post(`${this.urlApiCancelInvoiceOnline}/${idHoaDon}`, null);
  }

  /**Gọi api thay đổi trạng thái hóa đơn bán hàng online */
  callApiChangeStatusInvoice(idHoaDon: number, trangThaiMoi: StatusHD) {
    return this.http.post(`${this.urlApiChangeInvoiceStatus}/${idHoaDon}/${trangThaiMoi}`, null);
  }

}
