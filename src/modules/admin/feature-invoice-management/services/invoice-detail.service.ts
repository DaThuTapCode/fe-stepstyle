import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import {HoaDonChiTietResponse} from "../../../../models/hoa-don-chi-tiet/response/hoa-don-chi-tiet-response";



@Injectable({
  providedIn: 'root'
})
export class InvoiceDetailService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn api
  private baseUrlApi = environment.apiUrl;
  //Api lấy tất cả danh sách HĐCT
  private uriApiGetAllInvoiceDetail: string = `${this.baseUrlApi}/api/hoa-don-chi-tiet/get-all`;
  //Api cập nhật danh sách HĐCT
  private uriApiPutUpdateInvoiceDetail: string = `${this.baseUrlApi}/api/hoa-don-chi-tiet/update`;
  //APi tìm kiếm HĐCT
  private uriApiGetInvoiceDetailById: string = `${this.baseUrlApi}/api/hoa-don-chi-tiet`;

  getAllInvoiceDetail(): Observable<HoaDonChiTietResponse[]> {
    return this.http.get<HoaDonChiTietResponse[]>(this.uriApiGetAllInvoiceDetail);
  }

  // Hàm call Api cập nhật hóa đơn
  putUpdateInvoice(
    invoiceUpdate: any
  ): Observable<HoaDonChiTietResponse[]> {
    return this.http.put<HoaDonChiTietResponse[]>(this.uriApiPutUpdateInvoiceDetail, invoiceUpdate);
  }

  // Hàm call Api chi tiết hóa đơn
  getInvoiDetailById(
    idHoaDonChiTiet: number,
  ): Observable<any> {
    return this.http.get<any>(`${this.uriApiGetInvoiceDetailById}/${idHoaDonChiTiet}`);
  }
}

