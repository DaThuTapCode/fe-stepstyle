import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { KhachHangRequest } from '../../../../models/khach-hang/request/khach-hang-request';
import { KhachHangResponse } from '../../../../models/khach-hang/response/khach-hang-response';
import { DiaChiKhachHangRequest } from '../../../../models/dia-chi-khach-hang/request/dia-chi-khach-hang-request';

@Injectable({
  providedIn: 'root'
})
export class KhachHangService {

  constructor(private http: HttpClient) {}

  // Các biến lưu trữ đường dẫn API
  private baseUrlApi = environment.apiUrl;
  private uriApiGetAllCustomer: string = `${this.baseUrlApi}/api/khach-hang/get-all`;
  private uriApiGetCustomerById: string = `${this.baseUrlApi}/api/khach-hang`;   // API lấy chi tiết khách hàng
  private uriApiUpdateCustomer: string = `${this.baseUrlApi}/api/khach-hang/update`; // API cập nhật khách hàng
  private uriApiGetCustomersByPage: string = `${this.baseUrlApi}/api/khach-hang/get-page`; // API phân trang
  private uriApiAddCustomer: string = `${this.baseUrlApi}/api/khach-hang/create`; // API thêm khách hàng
  private uriApiDCKHByCustomerId: string = `${this.baseUrlApi}/api/dia-chi-khach-hang/create-dckh-by-idKH`; // API thêm địa chỉ khách hàng

  /** Lấy danh sách tất cả khách hàng */
  getAllCustomer(): Observable<KhachHangResponse[]> {
    return this.http.get<KhachHangResponse[]>(this.uriApiGetAllCustomer);
  }

  /** Lấy chi tiết khách hàng theo ID */
  getCustomerById(idKhachHang: number): Observable<KhachHangResponse> {
    const url = `${this.uriApiGetCustomerById}/${idKhachHang}`;
    return this.http.get<KhachHangResponse>(url);
  }

  /** Cập nhật thông tin khách hàng */
  updateCustomer(idKhachHang: number, data: KhachHangRequest): Observable<any> {
    const url = `${this.uriApiUpdateCustomer}/${idKhachHang}`;
    return this.http.put(url, data);
  }

  /** Lấy danh sách khách hàng theo trang */
  getCustomersByPage(khachHangSearchRequest: any, page: number, size: number): Observable<any> {
    const url = `${this.uriApiGetCustomersByPage}?page=${page}&size=${size}`;
    return this.http.post<any>(url, khachHangSearchRequest); // Có thể trả về dữ liệu bao gồm danh sách và thông tin phân trang
  }

  /** Thêm khách hàng mới */
  addCustomer(customer: KhachHangRequest): Observable<any> {
    return this.http.post(this.uriApiAddCustomer, customer);
  }

  /** Thêm địa chỉ khách hàng theo IDKH */
  addDCKHByIdKH(idKhachHang: number, dckh: DiaChiKhachHangRequest): Observable<any> {
    return this.http.post(`${this.uriApiDCKHByCustomerId}/${idKhachHang}`, dckh);
  }
  
}
