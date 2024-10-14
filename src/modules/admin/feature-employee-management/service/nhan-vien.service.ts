import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { NhanVienResponse } from '../../../../models/nhan-vien/response/nhan-vien-response';


@Injectable({
  providedIn: 'root'
})
export class NhanVienService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn api
  private baseUrlApi =  environment.apiUrl;

  private uriApiGetAllEmployee: string = `${this.baseUrlApi}/api/nhan-vien/get-all`;

  getAllEmployee(): Observable<NhanVienResponse[]>{
    return this.http.get<NhanVienResponse[]>(this.uriApiGetAllEmployee);
  }
}
