import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

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


  //  POST
  /**Đường dẫn api tạo hóa đơn chờ thanh toán*/
  private apiPostCreateNewPendingInvoice: string = `${this.apiBaseUrl}/`;
  /**Đường dẫn lấy danh sách sản phẩm chi tiết */
  private apiUrlGetListProductDetail: string = `${this.apiBaseUrl}/`;
  /**Tạo hóa đơn chi tiết mới */
  private apiUriCreateNewDeatilInvoiceCounterSales: string =`${this.apiBaseUrl}/http://localhost:8080/api/bhtq/{{idHoaDon}}/create-detail-invoice/{{idSPCT}}`;

  //  PUT
  //  DELETE

  /**Inject Dependencies*/
  constructor(private http: HttpClient) { };


  /**Gọi api lấy danh sách hóa đơn chờ thanh toán bán tại quầy */ 
  callApiGetListPendingInvoiceCounterSales(): Observable<any> {
    return this.http.get<any>(this.apiUrlGetListPendingInvoice);
  }
  /**Gọi api tạo hóa đơn chờ thanh toán tại quầy*/
  callApiCreateNewPendingInvoice(): Observable<any> {
    return new Observable;
  };

  /**Gọi api lấy danh sách hóa đơn chi tiết theo id hóa đơn chờ */
  callApiGetListDetailInvoice(
    idHoaDon: number
  ): Observable<any> {
    return this.http.get<any>(`${this.apiUrlGetListDetailInvoice}/${idHoaDon}`);
  }

  /**Gọi api tạo hóa đơn chi tiết mới */
  callApiCreateNewDetailInvoice(
    idHoaDon: number,
    idSPCT: number,
    data: any
  ): Observable<any> {
    const url = this.apiUriCreateNewDeatilInvoiceCounterSales
      .replace('{idHoaDon}', idHoaDon.toString())
      .replace('{idSPCT}', idSPCT.toString());
    return this.http.post<any>(url, data);
  }


}
