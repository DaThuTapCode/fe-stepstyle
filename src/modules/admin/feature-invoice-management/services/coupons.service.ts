import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PhieuGiamGia } from '../../../../models/phieu-giam-gia/request/phieu-giam-gia';

@Injectable({
  providedIn: 'root'
})
export class CouponsService {

  constructor(
    private http: HttpClient
  ) { }

    //Các biến lưu trữ đường dẫn api
    private baseUrlApi =  environment.apiUrl;

    private uriApiGetAllCoupons: string = `${this.baseUrlApi}/api/phieu-giam-gia/get-all`;
  
    getAllCoupons(): Observable<PhieuGiamGia[]>{
      return this.http.get<PhieuGiamGia[]>(this.uriApiGetAllCoupons);
    }
}
