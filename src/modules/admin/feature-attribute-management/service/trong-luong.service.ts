import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrongLuong } from '../../../../models/trong-luong/response/trong-luong';

@Injectable({
  providedIn: 'root',
})
export class TrongLuongService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllTrongLuong: string = `${this.baseUrlApi}/api/trong-luong/get-all`;
  private uriApiAddTrongLuong: string = `${this.baseUrlApi}/api/trong-luong/create-trong-luong`;

  constructor(private http: HttpClient) {}

  // call api getAll trọng lượng
  getAllTrongLuong(): Observable<TrongLuong[]> {
    return this.http.get<TrongLuong[]>(this.uriApiGetAllTrongLuong);
  }

  // add trọng lượng
  postAddTrongLuong(trongLuongAdd: TrongLuong): Observable<any> {
    return this.http.post<any>(this.uriApiAddTrongLuong, trongLuongAdd);
  }
}
