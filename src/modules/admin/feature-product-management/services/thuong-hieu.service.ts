import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import { ThuongHieuRequest } from '../../../../models/thuong-hieu/request/thuong-hieu-request';
import { ThuongHieuResponse } from '../../../../models/thuong-hieu/response/thuong-hieu-response';
import { ThuongHieuSearchRequest } from '../../../../models/thuong-hieu/request/thuong-hieu-search-request';

@Injectable({
  providedIn: 'root'
})
export class ThuongHieuService {

  private baseUrlApi: string = `${environment.apiUrl}/api`;

  /**Uri api*/
  private urlGetAllThuongHieu: string = `${this.baseUrlApi}/thuong-hieu/get-all`;
  private urlGetThuongHieuById: string = `${this.baseUrlApi}/thuong-hieu`;
  private urlCreateThuongHieu: string = `${this.baseUrlApi}/thuong-hieu/create`;
  private urlSearchThuongHieu: string = `${this.baseUrlApi}/thuong-hieu/search`;

  constructor(private http: HttpClient) { }

  public getAllThuongHieu(): Observable<any> {
    return this.http.get<any>(this.urlGetAllThuongHieu);
  }

  /**Gọi api tạo thương hiệu mới */
  createThuongHieu(data: any): Observable<any> {
    return this.http.post<any>(this.urlCreateThuongHieu, data);
  }

  /**Gọi api lấy thương hiệu theo id */
  callApiGetThuongHieuById(idThuongHieu: number): Observable<any>{
    return this.http.get<any>(`${this.urlGetThuongHieuById}/${idThuongHieu}`);
  }

  /** Gọi api update thương hiệu*/
  callApiUpdateThuongHieu(thuongHieuUpdate: ThuongHieuResponse): Observable<any> {
    const url = `${this.baseUrlApi}/thuong-hieu/update/${thuongHieuUpdate.idThuongHieu}`;
    return this.http.put<any>(url, thuongHieuUpdate);
  }

  /**phân trang và search thương hiệu*/
  searchPageThuongHieu(thuongHieuSearchRequest: ThuongHieuSearchRequest, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.urlSearchThuongHieu}?page=${page}&size=${size}`, thuongHieuSearchRequest);
  }
}
