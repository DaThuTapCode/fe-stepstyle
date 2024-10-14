import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { LichSuHoaDon } from '../../../../models/lich-su-hoa-don/request/lich-su-hoa-don';

@Injectable({
  providedIn: 'root'
})
export class InvoiceHistoryService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn api
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllInvoiceHistory: string = `${this.baseUrlApi}/api/lich-su-hoa-don/get-all`;

  getAllInvoiceHistory(): Observable<LichSuHoaDon[]>{
    return this.http.get<LichSuHoaDon[]>(this.uriApiGetAllInvoiceHistory);
  }
}
