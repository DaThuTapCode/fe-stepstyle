import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { ThanhToan } from '../../../../models/thanh-toan/request/thanh-toan';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(
    private http: HttpClient
  ) { }

    //Các biến lưu trữ đường dẫn api
    private baseUrlApi =  environment.apiUrl;

    private uriApiGetAllPayment: string = `${this.baseUrlApi}/api/thanh-toan/get-all`;
  
    getAllPayment(): Observable<ThanhToan[]>{
      return this.http.get<ThanhToan[]>(this.uriApiGetAllPayment);
    }
}
