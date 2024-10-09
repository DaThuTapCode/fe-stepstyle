import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { MauSac } from '../../../../models/mau-sac/response/mau-sac';

@Injectable({
  providedIn: 'root'
})
export class MauSacService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn api
  private baseUrlApi =  environment.apiUrl;

  private uriApiGetAllMauSac: string = `${this.baseUrlApi}/api/mau-sac/get-all`;
  private uriApiAddMauSac: string = `${this.baseUrlApi}/api/mau-sac/create-mau-sac`;

  getAllMauSac(): Observable<MauSac[]>{
    return this.http.get<MauSac[]>(this.uriApiGetAllMauSac);
  }

  // call api add màu sắc
  postAddMauSac(mauSacAdd: any): Observable<any>{
    return this.http.post<any>(this.uriApiAddMauSac, mauSacAdd)

  }
}
