import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SanPham } from '../../../../models/san-pham/response/san-pham';

@Injectable({
  providedIn: 'root'
})
export class SanPhamService {

  constructor(
    private http: HttpClient
  ) { }

  //Các biến lưu trữ đường dẫn api
  private baseUrlApi =  environment.apiUrl;

  private uriApiGetAllProduct: string = `${this.baseUrlApi}/api/san-pham/get-all`;

  getAllProduct(): Observable<SanPham[]>{
    return this.http.get<SanPham[]>(this.uriApiGetAllProduct);
  }
}
