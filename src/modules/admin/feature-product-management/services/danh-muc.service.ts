import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import { DanhMucRequest } from '../../../../models/danh-muc/request/danh-muc-request';

@Injectable({
  providedIn: 'root'
})
export class DanhMucService {

  private baseUrlApi: string = `${environment.apiUrl}/api`;

  /**Uri api*/
  private urlGetAllDanhMuc: string = `${this.baseUrlApi}/danh-muc/get-all`;
  private urlGetDanhMucById: string = `${this.baseUrlApi}/danh-muc`;
  private urlCreateDanhMuc: string = `${this.baseUrlApi}/danh-muc/create`;
  private urlUpdateDanhMuc: string = `${this.baseUrlApi}/danh-muc/update`;
  private urlSearchDanhMuc: string = `${this.baseUrlApi}/danh-muc/search`;

  constructor(private http: HttpClient) { }

  public getAllDanhMuc(): Observable<any> {
    return this.http.get<any>(this.urlGetAllDanhMuc);
  }

  /**Gọi api tạo danh mục mới */
  createDanhMuc(data: any): Observable<any> {
    return this.http.post<any>(this.urlCreateDanhMuc, data);
  }

  /**Gọi api lấy danh mục theo id */
  callApiGetDanhMucById(idDanhMuc: number): Observable<any>{
    return this.http.get<any>(`${this.urlGetDanhMucById}/${idDanhMuc}`);
  }

  /** Gọi api update danh mục*/
  callApiUpdateDanhMuc(idDanhMuc: number, data: DanhMucRequest): Observable<any> {
    const url = `${this.urlUpdateDanhMuc}/${idDanhMuc}`;
    return this.http.put(url, data);
  }

}
