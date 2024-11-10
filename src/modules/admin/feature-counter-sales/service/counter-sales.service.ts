import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SanPhamChiTietSearchRequest } from '../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-search-request';
import { HoaDonChiTietRequest } from '../../../../models/hoa-don-chi-tiet/request/hoa-don-chi-tiet-request';
import { PhieuGiamGiaSearch } from '../../../../models/phieu-giam-gia/request/phieu-giam-gia-search';

@Injectable({
  providedIn: 'root'
})
/**Service phục vụ nghiệp vụ bán hàng tại quầy */
export class CounterSalesService {
  /**Đường dẫn api cơ sở */
  private apiBaseUrl: string = environment.apiUrl;

  //  GET
  /**Đường dẫn api lấy danh sách hóa đơn chờ*/
  private apiUrlGetListPendingInvoice: string = `${this.apiBaseUrl}/api/bhtq/list-pending-invoice`;

  /**Đường dẫn lấy danh sách hóa đơn chi tiết theo id hóa đơn chờ */
  private apiUrlGetListDetailInvoice: string = `${this.apiBaseUrl}/api/bhtq/list-invoice-counter-sales`;

  /**Đường dẫn api lấy danh sách hóa đơn chờ*/
  private apiUrlGetListSanPhamChiTiet: string = `${this.apiBaseUrl}/api/san-pham-chi-tiet/get-all`;

  //  POST
  /**Đường dẫn api tạo hóa đơn chờ thanh toán*/
  private apiPostCreateNewPendingInvoice: string = `${this.apiBaseUrl}/api/bhtq/create-pending-invoice-counter-sales`;
  /**Đường dẫn lấy danh sách sản phẩm chi tiết */
  private apiUrlGetListProductDetail: string = `${this.apiBaseUrl}/`;
  /**Tạo hóa đơn chi tiết mới */
  private apiUriCreateNewDeatilInvoiceCounterSales: string =`${this.apiBaseUrl}/api/bhtq/{{idHoaDon}}/create-detail-invoice/{{idSPCT}}`;
  private apiUriCreateNewDetailInvoiceCounterSales: string =`${this.apiBaseUrl}/api/bhtq/create-detail-invoice`;
  /**Đường dẫn lấy danh sách khách hàng theo phân trang */
  private apiUrlGetCustomersByPage: string = `${this.apiBaseUrl}/api/bhtq/list-customer`;
  /**Đường dẫn lấy danh sách thuộc tính*/
  private apiUrlGetListSPCT: string = `${this.apiBaseUrl}/api/bhtq/search-spct`;
  /**Đường dẫn chuyển trạng thái hóa đơn sau khi thanh toán */
  private apiUrlPayInvoice: string = `${this.apiBaseUrl}/api/bhtq/invoice/pay`;
  /**Đường dẫn xóa hóa đơn chi tiết */
  private apiDeleteDetailInvoice: string = `${this.apiBaseUrl}/api/bhtq/cancel-detail-invoice`;
  /**Đường dẫn thanh toán VNPAY */
  private apiVnpayBankTransfer: string = `${this.apiBaseUrl}/api/bhtq/vnpay-bank-transfer`;
  /**Đường dẫn lấy danh sách PGG */
  private uriApiPostSearchPageCoupons: string = `${this.apiBaseUrl}/api/bhtq/list-coupons`;

  /**Đường dẫn sửa số lượng sản phẩm trong hóa đơn chi tiết */
  private urlApiPostSuaSoLuongSanPhamTrongHDCT: string = `${this.apiBaseUrl}/api/bhtq/update-quantity-product-detail-in-detail-invoice`;

  //  PUT
  private apiUrlPutCustomerToInvoiceCounterSales: string = `${this.apiBaseUrl}/api/bhtq/update-hoa-don`;
  /**Đường dẫn chọn phiếu giảm giá */
  private apiUrlCouponsToInvoiceCounterSales: string = `${this.apiBaseUrl}/api/bhtq/update-coupons`;

  //  DELETE
  /** Đường dẫn api hủy hóa đơn chờ */
  private apiUrlCancelInvoice: string = `${this.apiBaseUrl}/api/bhtq/cancel`;

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
    return this.http.post<any>(this.apiPostCreateNewPendingInvoice, null);
  };

  /**Gọi api lấy danh sách khách hàng theo phân trang */
  callApigetCustomersByPage(khachHangSearchRequest: any, page: number, size: number): Observable<any> {
    const url = `${this.apiUrlGetCustomersByPage}?page=${page}&size=${size}`;
    return this.http.post<any>(url, khachHangSearchRequest); // Có thể trả về dữ liệu bao gồm danh sách và thông tin phân trang
  }
  /**Gọi api lấy danh sách hóa đơn chi tiết theo id hóa đơn chờ */
  callApiGetListDetailInvoice(
    idHoaDon: number
  ): Observable<any> {
    return this.http.get<any>(`${this.apiUrlGetListDetailInvoice}/${idHoaDon}`);
  }

  /**Gọi api tạo hóa đơn chi tiết mới */
  callApiCreateNewDetailInvoice(hoaDonChiTietRequest: HoaDonChiTietRequest
  ): Observable<any> {
    return this.http.post<any>(this.apiUriCreateNewDetailInvoiceCounterSales, hoaDonChiTietRequest);
  }


  /** Gọi API lấy danh sách spct */
  callApiGetListSPCT(thuocTinhSearchRequest: SanPhamChiTietSearchRequest, page: number, size: number): Observable<any> {
    const url = `${this.apiUrlGetListSPCT}?page=${page}&size=${size}`;
    return this.http.post<any>(url, thuocTinhSearchRequest); // Có thể trả về dữ liệu bao gồm danh sách và thông tin phân trang
  }

  /** Call api chuyển trạng thái hóa đơn thanh toán thành công */
  callApiPayInvoice(idHoaDon: number): Observable<any>{
    return this.http.post<any>(`${this.apiUrlPayInvoice}/${idHoaDon}`, null);
  }

  /**call api hủy hóa đơn chờ*/
  callApiCancelInvoiceById(idHoaDon: number): Observable<any[]>{
    console.log(this.apiUrlCancelInvoice); // Kiểm tra giá trị đường dẫn
    return this.http.delete<any[]>(`${this.apiUrlCancelInvoice}/${idHoaDon}`)
  }

  /** Gọi api sửa khách hàng trong hoá đơn */
  callApiUpdateCustomerToInvoiceCounterSales(idHoaDon: number, idKhachHang: number): Observable<any>{
    return this.http.put<any>(`${this.apiUrlPutCustomerToInvoiceCounterSales}/${idHoaDon}/${idKhachHang}`, null);
  }

  /** Gọi api chọn PGG trong hoá đơn */
  callApiCouponsToInvoiceCounterSales(idHoaDon: number, idPhieuGiamGia: number): Observable<any>{
    return this.http.put<any>(`${this.apiUrlCouponsToInvoiceCounterSales}/${idHoaDon}/${idPhieuGiamGia}`, null);
  }

  /**Gọi api hủy hóa đơn chi tiết */
  callApiDeleteDetailInvoice(idHdct: number): Observable<any>{
    return this.http.post(`${this.apiDeleteDetailInvoice}/${idHdct}`, null);
  }

  /**Gọi api thanh toán VNPAY */
  callApiVnpayBankTransfer(idHoaDon: number): Observable<any> {
    return this.http.post<any>(`${this.apiVnpayBankTransfer}/${idHoaDon}`, null);
  }

  /**Tìm kiếm phân trang phiếu giảm giá */
  searchPageCoupons(phieuGiamGiaSearch: PhieuGiamGiaSearch, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.uriApiPostSearchPageCoupons}?page=${page}&size=${size}`, phieuGiamGiaSearch);
  }
  /** Gọi api sửa số lượng sản phẩm trong hdct */
  callApiSuaSoLuongSanPhamTrongHDCT(idHDCT: number, soLuongThayDoi: number): Observable<any> {
    return this.http.post<any>(`${this.urlApiPostSuaSoLuongSanPhamTrongHDCT}/${idHDCT}/${soLuongThayDoi}`, null)
  }
}
