import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../../shared/notification.service';
import { SanPhamChiTietResponse } from '../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems: any[] = []; // Mảng chứa sản phẩm trong giỏ hàng
  storageKey = 'cart'; // Key để lưu trữ trong storage

  private baseUrlApi = environment.apiUrl;

  private urlApiGetSPCTByListId: string = `${this.baseUrlApi}/api/san-pham-chi-tiet/get-by-list-id`;

  constructor(
    private http: HttpClient,
    private  notificationService: NotificationService
  ) {
    // Khởi tạo giỏ hàng từ storage (nếu có)
    const storedCart = localStorage.getItem(this.storageKey);
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
  }

  addToCart(spct: SanPhamChiTietResponse) {
    // Tìm sản phẩm trong giỏ hàng
    const itemIndex = this.cartItems.findIndex(item => item.idSpct === spct.idSpct);

    if (itemIndex !== -1) {
      // Nếu sản phẩm đã tồn tại, tăng số lượng
      this.cartItems[itemIndex].soLuongTrongGioHang += 1;
    } else {
      // Nếu sản phẩm chưa tồn tại, thêm sản phẩm mới
      this.cartItems.push({
        idSpct: spct.idSpct,
        soLuongTrongGioHang: 1
      });
    }

    this.notificationService.showSuccess('Thêm sản phẩm vào giỏ hàng thành công!');
    // Lưu lại giỏ hàng vào localStorage
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  getCartItems() {
    // Lấy danh sách sản phẩm trong giỏ hàng
    return this.cartItems;
  }

  getListIdSPCT(): number[] {
    // Lấy giỏ hàng từ localStorage
    const storedCart = localStorage.getItem(this.storageKey);
    
    if (storedCart) {
      // Chuyển đổi dữ liệu giỏ hàng từ JSON thành mảng đối tượng
      const cartItems = JSON.parse(storedCart);
      
      // Sử dụng map để lấy ra danh sách idSpct
      return cartItems.map((item: any) => item.idSpct);
    }
    
    // Nếu giỏ hàng trống hoặc không có trong storage, trả về mảng rỗng
    return [];
  }
  

  
  /** Hàm call api spct by list id */
callApiGetSPCTByListId() {
  const listIdSpct = this.getListIdSPCT();
  console.log('Danh sách idSpct:', listIdSpct);

  return this.http.post<any>(this.urlApiGetSPCTByListId, listIdSpct, {
    headers: { 'Content-Type': 'application/json' }
  });
}



}

