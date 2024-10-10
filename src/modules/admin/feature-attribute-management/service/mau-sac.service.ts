import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { MauSac } from '../../../../models/mau-sac/response/mau-sac';

@Injectable({
  providedIn: 'root',
})
export class MauSacService {
  private baseUrlApi = environment.apiUrl;

  private uriApiGetAllMauSac: string = `${this.baseUrlApi}/api/mau-sac/get-all`;
  private uriApiAddMauSac: string = `${this.baseUrlApi}/api/mau-sac/create-mau-sac`;
  // private uriApiUpdateMauSac: string = `${this.baseUrlApi}/api/mau-sac/update-mau-sac/{{id}}`;

  constructor(private http: HttpClient) {}

  getAllMauSac(): Observable<MauSac[]> {
    return this.http.get<MauSac[]>(this.uriApiGetAllMauSac);
  }

  postAddMauSac(mauSacAdd: MauSac): Observable<any> {
    return this.http.post<any>(this.uriApiAddMauSac, mauSacAdd);
  }

  putUpdateMauSac(mauSacUpdate: MauSac): Observable<any> {
    // Thay thế {{id}} bằng giá trị thực tế của mauSacUpdate.idMauSac
    const url = `${this.baseUrlApi}/api/mau-sac/update-mau-sac/${mauSacUpdate.idMauSac}`; // Thêm ID vào URL
    return this.http.put<any>(url, mauSacUpdate); // Gửi mauSacUpdate trong thân yêu cầu
  }

  getMauSacById(idMauSac: number): Observable<MauSac> {
    const url = `${this.baseUrlApi}/api/mau-sac/get-by-id/${idMauSac}`;
    return this.http.get<MauSac>(url);
  }
}
