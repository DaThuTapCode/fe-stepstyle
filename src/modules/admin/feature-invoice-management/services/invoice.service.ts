import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {HoaDonResponse} from "../../../../models/hoa-don/response/hoa-don-response";


@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn API
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllInvoice: string = `${this.baseUrlApi}/api/hoa-don/get-all`;

  private uriApiPutUpdateInvoice: string = `${this.baseUrlApi}/api/hoa-don/update`;

  private uriApiGetInvoiceById: string = `${this.baseUrlApi}/api/hoa-don`;

  getAllInvoice(): Observable<HoaDonResponse[]> {
    return this.http.get<HoaDonResponse[]>(this.uriApiGetAllInvoice);
  }

  // Hàm call Api cập nhật hóa đơn
  putUpdateInvoice(
    idHoaDon: number,
    data: HoaDonResponse
  ): Observable<HoaDonResponse> {
    return this.http.put<HoaDonResponse>(`${this.uriApiPutUpdateInvoice}/${idHoaDon}`, data);
  }

  // Hàm call Api chi tiết hóa đơn
  getInvoiceById(
    idHoaDon: number,
  ): Observable<any> {
    return this.http.get<any>(`${this.uriApiGetInvoiceById}/${idHoaDon}`);
  }
}
