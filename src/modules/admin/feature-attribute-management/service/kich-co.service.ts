import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KichCoResponse } from '../../../../models/kich-co/response/kich-co-response';

@Injectable({
  providedIn: 'root',
})
export class KichCoService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllKichCo: string = `${this.baseUrlApi}/api/kich-co/get-all`;
  private uriApiAddKichCo: string = `${this.baseUrlApi}/api/kich-co/create-kich-co`;

  constructor(private http: HttpClient) {}

  // call api getAll kích cỡ
  getAllKichCo(): Observable<KichCoResponse[]> {
    return this.http.get<KichCoResponse[]>(this.uriApiGetAllKichCo);
  }

  // add kích cỡ
  postAddKichCo(kichCoAdd: KichCoResponse): Observable<any> {
    return this.http.post<any>(this.uriApiAddKichCo, kichCoAdd);
  }

  // update kích cỡ
  putUpdateKichCo(kichCoUpdate: KichCoResponse): Observable<any> {
    // Thay thế {{id}} bằng giá trị thực tế của kichCoUpdate.idKichCo
    const url = `${this.baseUrlApi}/api/kich-co/update-kich-co/${kichCoUpdate.idKichCo}`; // Thêm ID vào URL
    return this.http.put<any>(url, kichCoUpdate); // Gửi kichCoUpdate trong thân yêu cầu
  }
}
