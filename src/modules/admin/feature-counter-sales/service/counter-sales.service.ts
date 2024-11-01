import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SanPhamChiTietSearchRequest } from '../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-search-request';

@Injectable({
  providedIn: 'root',
})
/**Service phục vụ nghiệp vụ bán hàng tại quầy */
export class CounterSalesService {
  /**Đường dẫn api cơ sở */
  private apiBaseUrl: string = environment.apiUrl;

  //  GET
  /**Đường dẫn api lấy danh sách hóa đơn chờ*/
  private apiUrlGetListPendingInvoice: string = `${this.apiBaseUrl}/api/bhtq/list-pending-invoice`;

  /**Đường dẫn lấy danh sách hóa đơn chi tiết theo id hóa đơn chờ */
  private apiUrlGetListDetailInvoice: string = `${this.apiBaseUrl}/`;

  /**Đường dẫn api lấy danh sách hóa đơn chờ*/
  private apiUrlGetListSanPhamChiTiet: string = `${this.apiBaseUrl}/api/san-pham-chi-tiet/get-all`;

  //  POST
  /**Đường dẫn api tạo hóa đơn chờ thanh toán*/
  private apiPostCreateNewPendingInvoice: string = `${this.apiBaseUrl}/`;
  /**Đường dẫn lấy danh sách sản phẩm chi tiết */
  private apiUrlGetListProductDetail: string = `${this.apiBaseUrl}/`;
  /**Đường dẫn lấy danh sách khách hàng theo phân trang */
  private apiUrlGetCustomersByPage: string = `${this.apiBaseUrl}/api/bhtq/list-customer`;
  /**Đường dẫn lấy danh sách thuộc tính*/
  private apiUrlGetListSPCT: string = `${this.apiBaseUrl}/api/bhtq/search-thuoc-tinh`;

  //  PUT

  //  DELETE
  /** Đường dẫn api hủy hóa đơn chờ */
  private apiUrlCancelInvoice: string = `${this.apiBaseUrl}/api/bhtq/invoices/cancel`;

  /**Inject Dependencies*/
  constructor(private http: HttpClient) {}

  /**Gọi api lấy danh sách hóa đơn chờ thanh toán bán tại quầy */
  callApiGetListPendingInvoiceCounterSales(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetListPendingInvoice);
  }

  /**Gọi api lấy danh sách sản phẩm chi tiết */
  callApiGetAllSanPhamChiTiet(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetListSanPhamChiTiet);
  }
  /**Gọi api tạo hóa đơn chờ thanh toán tại quầy*/
  callApiCreateNewPendingInvoice(): Observable<any> {
    return new Observable();
  }

  /**Gọi api lấy danh sách khách hàng theo phân trang */
  callApigetCustomersByPage(khachHangSearchRequest: any, page: number, size: number): Observable<any> {
    const url = `${this.apiUrlGetCustomersByPage}?page=${page}&size=${size}`;
    return this.http.post<any>(url, khachHangSearchRequest); // Có thể trả về dữ liệu bao gồm danh sách và thông tin phân trang
  }

  /** Gọi API lấy danh sách thuộc tính spct */
  callApiGetListThuocTinh(thuocTinhSearchRequest: SanPhamChiTietSearchRequest, page: number, size: number): Observable<any> {
    const url = `${this.apiUrlGetListSPCT}?page=${page}&size=${size}`;
    return this.http.post<any>(url, thuocTinhSearchRequest); // Có thể trả về dữ liệu bao gồm danh sách và thông tin phân trang
  }

  /**call api hủy hóa đơn chờ*/
  callApiCancelInvoiceById(id: number): Observable<any[]>{
    return this.http.delete<any[]>(`${this.apiUrlCancelInvoice}?id=${id}`)
  }
}
