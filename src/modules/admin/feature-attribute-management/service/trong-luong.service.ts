import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrongLuongResponse } from '../../../../models/trong-luong/response/trong-luong-response';


@Injectable({
  providedIn: 'root',
})
export class TrongLuongService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllTrongLuong: string = `${this.baseUrlApi}/api/trong-luong/get-all`;
  private uriApiAddTrongLuong: string = `${this.baseUrlApi}/api/trong-luong/create-trong-luong`;

  constructor(private http: HttpClient) {}

  // call api getAll trọng lượng
  getAllTrongLuong(): Observable<TrongLuongResponse[]> {
    return this.http.get<TrongLuongResponse[]>(this.uriApiGetAllTrongLuong);
  }

  // add trọng lượng
  postAddTrongLuong(trongLuongAdd: TrongLuongResponse): Observable<any> {
    return this.http.post<any>(this.uriApiAddTrongLuong, trongLuongAdd);
  }

  // update trọng lượng
  putUpdateTrongLuong(trongLuongUpdate: TrongLuongResponse): Observable<any> {
    // Thay thế {{id}} bằng giá trị thực tế của trongLuongUpdate.idTrongLuong
    const url = `${this.baseUrlApi}/api/trong-luong/update-trong-luong/${trongLuongUpdate.idTrongLuong}`; // Thêm ID vào URL
    return this.http.put<any>(url, trongLuongUpdate); // Gửi trongLuongUpdate trong thân yêu cầu
  }
}
