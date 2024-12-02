import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { SanPhamChiTietRequest } from '../../../../models/san-pham-chi-tiet/request/san-pham-chi-tiet-request';

@Injectable({
  providedIn: 'root'
})
export class SanPhamChiTietService {

  private baseUrlApi: string = `${environment.apiUrl}/api`;

  /**Uri api*/
  private urlGetAllSPCT: string = `${this.baseUrlApi}/san-pham-chi-tiet/get-all`;
  private urlGetSPCTById: string = `${this.baseUrlApi}/san-pham-chi-tiet`
  private urlCreateSPCT: string = `${this.baseUrlApi}/san-pham-chi-tiet/create-list`;
  private urlUpdateSPCT: string = `${this.baseUrlApi}/san-pham-chi-tiet/update`;


  constructor(private http: HttpClient) { }

  public getAllDanhMuc(): Observable<any> {
    return this.http.get<any>(this.urlGetAllSPCT);
  }


  public callApiCreateProductDetailByIdSanPham(idProduct: any, spctRequests: SanPhamChiTietRequest[]){
    return this.http.post<any>(`${this.urlCreateSPCT}/${idProduct}`, spctRequests);
  }

  /** Gọi api xem chi tiết spct id */
  public callApiProductById(idSpct: any){
    return this.http.get<any>(`${this.urlGetAllSPCT}/${idSpct}`);
  }

}
