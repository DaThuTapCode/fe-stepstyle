import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { NhanVienResponse } from '../../../../models/nhan-vien/response/nhan-vien-response';
import { NhanVienRequest } from '../../../../models/nhan-vien/request/nhan-vien-request';


@Injectable({
  providedIn: 'root'
})
export class NhanVienService {

  constructor(
    private http: HttpClient
  ) { }

  // Các biến lưu trữ đường dẫn API
  private baseUrlApi = environment.apiUrl;
  private uriApiGetAllEmployee: string = `${this.baseUrlApi}/api/nhan-vien/get-all`;
  private uriApiGetEmployeeById: string = `${this.baseUrlApi}/api/nhan-vien`;   // API lấy chi tiết nhân viên
  private uriApiUpdateEmployee: string = `${this.baseUrlApi}/api/nhan-vien/update`; // API cập nhật nhân viên
  private uriApiGetEmployeeByPage: string = `${this.baseUrlApi}/api/nhan-vien/get-page`; // API phân trang nhân viên
  private uriApiAddEmployee: string = `${this.baseUrlApi}/api/nhan-vien/create`; // API thêm nhân viên

  /** Lấy danh sách tất cả nhân viên */
  getAllEmployee(): Observable<NhanVienResponse[]> {
    return this.http.get<NhanVienResponse[]>(this.uriApiGetAllEmployee);
  }

  /** Lấy chi tiết nhân viên theo ID */
  getEmployeeById(idNhanVien: number): Observable<NhanVienResponse> {
    const url = `${this.uriApiGetEmployeeById}/${idNhanVien}`;
    return this.http.get<NhanVienResponse>(url);
  }

  /** Cập nhật thông tin nhân viên */
  updateEmployee(idNhanVien: number, data: NhanVienRequest): Observable<any> {
    const url = `${this.uriApiUpdateEmployee}/${idNhanVien}`;
    return this.http.put(url, data);
  }

  /** Lấy danh sách nhân viên theo trang */
  getEmployeeByPage(nhanVienSearchRequest: any, page: number, size: number): Observable<any> {
    const url = `${this.uriApiGetEmployeeByPage}?page=${page}&size=${size}`;
    return this.http.post<any>(url, nhanVienSearchRequest); // Có thể trả về dữ liệu bao gồm danh sách và thông tin phân trang
  }

  /** Thêm knhân viên mới */
  addEmployee(employee: NhanVienRequest): Observable<any> {
    return this.http.post(this.uriApiAddEmployee, employee);
  }
}
