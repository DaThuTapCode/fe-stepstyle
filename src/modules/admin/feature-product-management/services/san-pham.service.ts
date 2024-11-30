import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SanPhamSearch } from '../../../../models/san-pham/request/san-pham-search';
import { SanPhamRequest } from '../../../../models/san-pham/request/san-pham-request';

@Injectable({
  providedIn: 'root'
})
export class SanPhamService {

  constructor(
    private http: HttpClient
  ) { }

  private baseUrlApi =  environment.apiUrl;  //Các biến lưu trữ đường dẫn api
  
  private urlApiGetAllProduct: string = `${this.baseUrlApi}/api/san-pham/get-all`; //API lấy tất cả danh sách sản phẩm

  private urlApiPostSearchPageProduct: string = `${this.baseUrlApi}/api/san-pham/search`;  //API tìm kiếm phân trang sản phẩm

  private urlApiGetProductById: string = `${this.baseUrlApi}/api/san-pham`;  //API lấy sản phẩm theo id

  private urlApiPostCreateProduct: string = `${this.baseUrlApi}/api/san-pham/create`; //API tạo sản phẩm mới


  private urlApiPutUpdateProduct: string = `${this.baseUrlApi}/api/san-pham/update`; //API chỉnh sửa sản phẩm

  /**Lấy toàn bộ danh sách sản phẩm */
  getAllProduct(): Observable<any>{
    return this.http.get<any>(this.urlApiGetAllProduct);
  }

  /**Gọi api tạo sản phẩm mới */
  createProduct(data: any): Observable<any> {
    return this.http.post<any>(this.urlApiPostCreateProduct, data);
  }

  /**Gọi api tìm kiếm phân trang sản phẩm */
  searchPageProduct(sanPhamSearch: SanPhamSearch, page: number, size: number): Observable<any> {
    return this.http.post<any>(`${this.urlApiPostSearchPageProduct}?page=${page}&size=${size}`, sanPhamSearch);
  }

  /**Gọi api lấy sản phẩm theo id */
  callApiGetProductById(idProduct: number): Observable<any>{
    return this.http.get<any>(`${this.urlApiGetProductById}/${idProduct}`);
  }

  /**Gọi api cập nhật thông tin sản phẩm */
  callApiPutUpdateProduct(idSanPham: number, sanPham: SanPhamRequest) {
   return this.http.put(`${this.urlApiPutUpdateProduct}/${idSanPham}`, sanPham); 
  }
}
