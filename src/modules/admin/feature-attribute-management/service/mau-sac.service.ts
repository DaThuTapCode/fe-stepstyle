import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { MauSacResponse } from '../../../../models/mau-sac/response/mau-sac-response';
import { MauSacSearch } from '../../../../models/mau-sac/request/mau-sac-search';


@Injectable({
  providedIn: 'root',
})
export class MauSacService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllMauSac: string = `${this.baseUrlApi}/api/mau-sac/get-all`;
  private uriApiAddMauSac: string = `${this.baseUrlApi}/api/mau-sac/create-mau-sac`;
  private urlApiPostSearchPageMauSac: string = `${this.baseUrlApi}/api/mau-sac/search`;
  private uriApiGetMauSacById: string = `${this.baseUrlApi}/api/mau-sac`;   // API lấy chi tiết

  constructor(private http: HttpClient) {}

  // call api getAll màu sắc
  getAllMauSac(): Observable<MauSacResponse[]> {
    return this.http.get<MauSacResponse[]>(this.uriApiGetAllMauSac);
  }

  // add màu sắc
  postAddMauSac(mauSacAdd: MauSacResponse): Observable<any> {
    return this.http.post<any>(this.uriApiAddMauSac, mauSacAdd);
  }

  /** Lấy chi tiết theo ID */
  getMauSacById(idMauSac: number): Observable<MauSacResponse> {
    const url = `${this.uriApiGetMauSacById}/${idMauSac}`;
    return this.http.get<MauSacResponse>(url);
  }

  // update màu sắc
  putUpdateMauSac(mauSacUpdate: MauSacResponse): Observable<any> {
    // Thay thế {{id}} bằng giá trị thực tế của mauSacUpdate.idMauSac
    const url = `${this.baseUrlApi}/api/mau-sac/update-mau-sac/${mauSacUpdate.idMauSac}`; // Thêm ID vào URL
    return this.http.put<any>(url, mauSacUpdate); // Gửi mauSacUpdate trong thân yêu cầu
  }

  // phân trang
  searchPageMauSac(mauSacSearch: MauSacSearch, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.urlApiPostSearchPageMauSac}?page=${page}&size=${size}`, mauSacSearch);
  }
}
