import { Injectable } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThuongHieuService {

  private baseUrlApi: string = `${environment.apiUrl}/api`;

  /**Uri api*/
  private urlGetAllThuongHieu: string = `${this.baseUrlApi}/thuong-hieu/get-all`;
  private urlGetThuongHieuById: string = `${this.baseUrlApi}/thuong-hieu`;
  private urlCreateThuongHieu: string = `${this.baseUrlApi}/thuong-hieu/create`;
  private urlUpdateThuongHieu: string = `${this.baseUrlApi}/thuong-hieu/update`;

  constructor(private http: HttpClient) { }

  public getAllThuongHieu(): Observable<any> {
    return this.http.get<any>(this.urlGetAllThuongHieu);
  }

}
