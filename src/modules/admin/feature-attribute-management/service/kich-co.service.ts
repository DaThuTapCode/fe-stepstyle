import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { KichCo } from '../../../../models/kich-co/response/kich-co';

@Injectable({
  providedIn: 'root',
})
export class KichCoService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllKichCo: string = `${this.baseUrlApi}/api/kich-co/get-all`;
  private uriApiAddKichCo: string = `${this.baseUrlApi}/api/kich-co/create-kich-co`;

  constructor(private http: HttpClient) {}

  // call api getAll kích cỡ
  getAllKichCo(): Observable<KichCo[]> {
    return this.http.get<KichCo[]>(this.uriApiGetAllKichCo);
  }

  // add kích cỡ
  postAddKichCo(kichCoAdd: KichCo): Observable<any> {
    return this.http.post<any>(this.uriApiAddKichCo, kichCoAdd);
  }
}
