import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LichSuHoaDonRequest } from '../../../../models/lich-su-hoa-don/request/lich-su-hoa-don-request';


@Injectable({
  providedIn: 'root'
})
export class InvoiceHistoryService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn api
  private baseUrlApi = environment.apiUrl;

  /** Api lấy tất cả các biến */
  private uriApiGetAllInvoiceHistory: string = `${this.baseUrlApi}/api/lich-su-hoa-don/get-all`;

  /** Api lấy id */
  private uriApiGetByIdInvoiceHistory: string = `${this.baseUrlApi}/api/lich-su-hoa-don`;

  /** Lấy toàn bộ danh sách Lịch sử hóa đơn */
  getAllInvoiceHistory(): Observable<any>{
    return this.http.get<any>(this.uriApiGetAllInvoiceHistory);
  }

  /** Lấy chi tiết lịch sử hóa đơn */
  getByIdInvoiceHistory(
    idLshd: number
  ): Observable<any>{
    return this.http.get<any>(`${this.uriApiGetByIdInvoiceHistory}/${idLshd}`);
  }
}
