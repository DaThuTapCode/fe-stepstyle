import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DetailProductService {
  private baseUrlApi = environment.apiUrl;

  private urlApiGetProductById: string = `${this.baseUrlApi}/api/san-pham`;

  constructor(private http: HttpClient) {}

     /**Gọi api lấy sản phẩm theo id */
  callApiGetProductById(idProduct: number): Observable<any>{
    return this.http.get<any>(`${this.urlApiGetProductById}/${idProduct}`);
  }
}
