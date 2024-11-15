import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private baseUrlApi = environment.apiUrl;

  private urlApiGetDetailProductById: string = `${this.baseUrlApi}/api/san-pham-chi-tiet`;

  constructor(private http: HttpClient) {}

     /**Gọi api lấy sản phẩm chi tiết theo id */
     callApiGetDetailProductById(idDetailProduct: number): Observable<any>{
      return this.http.get<any>(`${this.urlApiGetDetailProductById}/${idDetailProduct}`);
    }

    createHoaDon(hoaDonRequest: any): Observable<any> {
      const url = `${this.baseUrlApi}/api/hoa-don/create`;
      return this.http.post<any>(url, hoaDonRequest);
    }
    
}
