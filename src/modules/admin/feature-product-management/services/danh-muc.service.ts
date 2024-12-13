import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import { DanhMucRequest } from '../../../../models/danh-muc/request/danh-muc-request';
import { DanhMucSearchRequest } from '../../../../models/danh-muc/request/danh-muc-search-request';
import { DanhMucResponse } from '../../../../models/danh-muc/response/danh-muc-response';

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
  callApiUpdateDanhMuc(danhMucUpdate: DanhMucResponse): Observable<any> {
    const url = `${this.baseUrlApi}/danh-muc/update/${danhMucUpdate.idDanhMuc}`;
    return this.http.put<any>(url, danhMucUpdate);
  }

  /**phân trang và search danh mục*/
  searchPageDanhMuc(danhMucSearchRequest: DanhMucSearchRequest, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.urlSearchDanhMuc}?page=${page}&size=${size}`, danhMucSearchRequest);
  }
}
