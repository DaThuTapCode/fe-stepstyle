import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KieuDeGiay } from '../../../../models/kieu-de-giay/response/kieu-de-giay';

@Injectable({
  providedIn: 'root',
})
export class KieuDeGiayService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllKieuDeGiay: string = `${this.baseUrlApi}/api/kieu-de-giay/get-all`;
  private uriApiAddKieuDeGiay: string = `${this.baseUrlApi}/api/kieu-de-giay/create-kieu-de-giay`;

  constructor(private http: HttpClient) {}

  // call api getAll kiểu đế giày
  getAllKieuDeGiay(): Observable<KieuDeGiay[]> {
    return this.http.get<KieuDeGiay[]>(this.uriApiGetAllKieuDeGiay);
  }

  // add kiểu đế giày
  postAddKieuDeGiay(kieuDeGiayAdd: KieuDeGiay): Observable<any> {
    return this.http.post<any>(this.uriApiAddKieuDeGiay, kieuDeGiayAdd);
  }

}
