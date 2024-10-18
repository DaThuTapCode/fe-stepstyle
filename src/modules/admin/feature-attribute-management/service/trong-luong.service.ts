import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TrongLuongResponse } from '../../../../models/trong-luong/response/trong-luong-response';
import { TrongLuongSearchRequest } from '../../../../models/trong-luong/request/trong-luong-search-request';


@Injectable({
  providedIn: 'root',
})
export class TrongLuongService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllTrongLuong: string = `${this.baseUrlApi}/api/trong-luong/get-all`;
  private uriApiAddTrongLuong: string = `${this.baseUrlApi}/api/trong-luong/create-trong-luong`;
  private uriApiGetTrongLuongById: string = `${this.baseUrlApi}/api/trong-luong`;   // API lấy chi tiết
  private urlApiPostSearchPageTrongLuong: string = `${this.baseUrlApi}/api/trong-luong/search`;

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

  /** Lấy chi tiết theo ID */
  getTrongLuongById(idTrongLuong: number): Observable<TrongLuongResponse> {
    const url = `${this.uriApiGetTrongLuongById}/${idTrongLuong}`;
    return this.http.get<TrongLuongResponse>(url);
  }

  // phân trang
  searchPageTrongLuong(trongLuongSearchRequest: TrongLuongSearchRequest, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.urlApiPostSearchPageTrongLuong}?page=${page}&size=${size}`, trongLuongSearchRequest);
  }
}
