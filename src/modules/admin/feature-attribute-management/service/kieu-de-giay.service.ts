import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KieuDeGiayResponse } from '../../../../models/kieu-de-giay/response/kieu-de-giay-response';


@Injectable({
  providedIn: 'root',
})
export class KieuDeGiayService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllKieuDeGiay: string = `${this.baseUrlApi}/api/kieu-de-giay/get-all`;
  private uriApiAddKieuDeGiay: string = `${this.baseUrlApi}/api/kieu-de-giay/create-kieu-de-giay`;

  constructor(private http: HttpClient) {}

  // call api getAll kiểu đế giày
  getAllKieuDeGiay(): Observable<KieuDeGiayResponse[]> {
    return this.http.get<KieuDeGiayResponse[]>(this.uriApiGetAllKieuDeGiay);
  }

  // add kiểu đế giày
  postAddKieuDeGiay(kieuDeGiayAdd: KieuDeGiayResponse): Observable<any> {
    return this.http.post<any>(this.uriApiAddKieuDeGiay, kieuDeGiayAdd);
  }


  // update kiểu đế giày
  putUpdateKieuDeGiay(kieuDeGiayUpdate: KieuDeGiayResponse): Observable<any> {
    // Thay thế {{id}} bằng giá trị thực tế của kieuDeGiayUpdate.idKieuDeGiay
    const url = `${this.baseUrlApi}/api/kieu-de-giay/update-kieu-de-giay/${kieuDeGiayUpdate.idKieuDeGiay}`; // Thêm ID vào URL
    return this.http.put<any>(url, kieuDeGiayUpdate); // Gửi kieuDeGiayUpdate trong thân yêu cầu
  }
}
