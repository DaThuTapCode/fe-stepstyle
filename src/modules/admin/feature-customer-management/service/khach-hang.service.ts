import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { KhachHangRequest } from '../../../../models/khach-hang/request/khach-hang-request';
import { KhachHangResponse } from '../../../../models/khach-hang/response/khach-hang-response';

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
  getCustomersByPage(dataSearch: any, page: number, size: number): Observable<any> {
    const url = `${this.uriApiGetCustomersByPage}?page=${page}&size=${size}`;
    return this.http.post<any>(url, dataSearch); // Có thể trả về dữ liệu bao gồm danh sách và thông tin phân trang
  }

  /** Thêm khách hàng mới */
  addCustomer(customer: KhachHangRequest): Observable<any> {
    return this.http.post(this.uriApiAddCustomer, customer);
  }

  checkMaKhachHang(maKhachHang: string): Observable<boolean> {
    return this.http.get<boolean>(`/api/khach-hang/checkMaKhachHang/${maKhachHang}`);
  }
  
}
