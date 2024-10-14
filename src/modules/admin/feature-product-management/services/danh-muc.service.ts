import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";

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

  constructor(private http: HttpClient) { }

  public getAllDanhMuc(): Observable<any> {
    return this.http.get<any>(this.urlGetAllDanhMuc);
  }


}
