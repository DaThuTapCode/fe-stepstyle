import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
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
    //Api lấy tất cả danh sách Thanh Toán
    private uriApiGetAllPayment: string = `${this.baseUrlApi}/api/thanh-toan/get-all`;
    //Api tạo mới Thanh Toán
    private uriApiPostPayment: string = `${this.baseUrlApi}/api/thanh-toan/create`;
    //Api cập nhật Thanh toán
    private uriApiPutPayment: string = `${this.baseUrlApi}/api/thanh-toan/update`;
    //Api tìm kiếm phân trang Thanh Tían
    private uriApiPostSearchPagePayment: string = `${this.baseUrlApi}/api/thanh-toan/search`;
  
    getAllPayment(): Observable<any>{
      return this.http.get<any>(this.uriApiGetAllPayment);
    }
}
