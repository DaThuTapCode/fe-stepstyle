import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { MauSacResponse } from '../../../../models/mau-sac/response/mau-sac-response';


@Injectable({
  providedIn: 'root',
})
export class MauSacService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllMauSac: string = `${this.baseUrlApi}/api/mau-sac/get-all`;
  private uriApiAddMauSac: string = `${this.baseUrlApi}/api/mau-sac/create-mau-sac`;
  private uriApiGetMauSacByPage: string = `${this.baseUrlApi}/api/mau-sac/get-page`;
  //private uriApiCustomersByPage: string = `${this.baseUrlApi}/api/mau-sac/get-page`;
  // private uriApiUpdateMauSac: string = `${this.baseUrlApi}/api/mau-sac/update-mau-sac/{{id}}`;

  constructor(private http: HttpClient) {}

  // call api getAll màu sắc
  getAllMauSac(): Observable<MauSacResponse[]> {
    return this.http.get<MauSacResponse[]>(this.uriApiGetAllMauSac);
  }

  // add màu sắc
  postAddMauSac(mauSacAdd: MauSacResponse): Observable<any> {
    return this.http.post<any>(this.uriApiAddMauSac, mauSacAdd);
  }

  // /** Lấy danh sách khách hàng theo trang */
  // getCustomersByPage(dataSearch: any, page: number, size: number): Observable<any> {
  //   const url = `${this.uriApiGetCustomersByPage}?page=${page}&size=${size}`;
  //   return this.http.post<any>(url, dataSearch); // Có thể trả về dữ liệu bao gồm danh sách và thông tin phân trang
  // }

  // update màu sắc
  putUpdateMauSac(mauSacUpdate: MauSacResponse): Observable<any> {
    // Thay thế {{id}} bằng giá trị thực tế của mauSacUpdate.idMauSac
    const url = `${this.baseUrlApi}/api/mau-sac/update-mau-sac/${mauSacUpdate.idMauSac}`; // Thêm ID vào URL
    return this.http.put<any>(url, mauSacUpdate); // Gửi mauSacUpdate trong thân yêu cầu
  }

  // detail màu sắc
  getMauSacById(idMauSac: number): Observable<MauSacResponse> {
    const url = `${this.uriApiGetMauSacByPage}/${idMauSac}`;
    return this.http.get<MauSacResponse>(url);
  }
}
