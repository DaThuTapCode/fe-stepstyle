import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { NotificationService } from '../../../shared/notification.service';
import { SanPhamChiTietResponse } from '../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { SessionloginService } from '../../../core/auth/sessionlogin.service';
import { BehaviorSubject } from 'rxjs';
import { SanPhamChiTietService } from '../../admin/feature-product-management/services/san-pham-chi-tiet.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemCount = new BehaviorSubject<number>(0); // Observable để lưu số lượng
  cartItemCount$ = this.cartItemCount.asObservable(); // Observable để các component subscribe

  cartItems: any[] = []; // Mảng chứa sản phẩm trong giỏ hàng
  storageKey = 'cart' + this.sessionLoginService.getUser().userName; // Key để lưu trữ trong storage

  private baseUrlApi = environment.apiUrl;

  private urlApiGetSPCTByListId: string = `${this.baseUrlApi}/api/san-pham-chi-tiet/get-by-list-id`;

  constructor(
    private http: HttpClient,
    private notificationService: NotificationService,
    private sessionLoginService: SessionloginService,
    private spctService: SanPhamChiTietService,
  ) {
    const storedCart = localStorage.getItem(this.storageKey);    // Khởi tạo giỏ hàng từ storage
    if (storedCart) {
      this.cartItems = JSON.parse(storedCart);
    }
    this.updateCartItemCount(); // Cập nhật số lượng từ giỏ hàng đã lưu
  }

  addToCart(spct: SanPhamChiTietResponse) {
    
    // Tìm sản phẩm trong giỏ hàng
    this.lamMoiDuLieu();
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
    this.updateCartItemCount(); // Cập nhật số lượng từ giỏ hàng đã lưu
  }

  updateSoLuongSPCTTrongGioHang(idSpct: number, soLuongThayDoi: number) {
    // Tìm sản phẩm trong giỏ hàng
    this.lamMoiDuLieu();

    const itemIndex = this.cartItems.findIndex(item => item.idSpct === idSpct);
    if (itemIndex !== -1) {
      this.cartItems[itemIndex].soLuongTrongGioHang = soLuongThayDoi;      // Nếu sản phẩm đã tồn tại, tăng số lượng
    }
    else {
      this.notificationService.showError('Không tìm thấy sản phẩm cần tăng số lượng trong giỏ hàng!');
    }
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems));
  }

  /** Lấy danh sách sản phẩm trong giỏ hàng*/
  getCartItems() {
    return this.cartItems;
  }

  getListIdSPCT(): number[] {
    const storedCart = localStorage.getItem(this.storageKey);    // Lấy giỏ hàng từ localStorage
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);  // Chuyển đổi dữ liệu giỏ hàng từ JSON thành mảng đối tượng
      return cartItems.map((item: any) => item.idSpct); // Sử dụng map để lấy ra danh sách idSpct
    }
    return [];  // Nếu giỏ hàng trống hoặc không có trong storage, trả về mảng rỗng
  }

  getSoLuongMuaByIdSPCT(spct: SanPhamChiTietResponse): number {
    const storedCart = localStorage.getItem(this.storageKey);  // Lấy giỏ hàng từ localStorage
    if (storedCart) {
      const cartItems = JSON.parse(storedCart);  // Chuyển đổi dữ liệu giỏ hàng từ JSON thành mảng đối tượng

      const cartItem = cartItems.find((item: any) => item.idSpct === spct.idSpct);  // Tìm sản phẩm chi tiết dựa trên idSpct

      return cartItem ? cartItem.soLuongTrongGioHang : 0;  // Trả về số lượng nếu tìm thấy, nếu không thì trả về 0
    }
    // Nếu giỏ hàng không tồn tại, trả về số lượng mặc định là 0
    return 0;
  }

  removeSP(spct: any) {
    this.lamMoiDuLieu();
    const data = localStorage.getItem(this.storageKey)
    if (data) {
      const items = JSON.parse(data); // Chuyển đổi JSON thành mảng
      // Tìm sản phẩm trong mảng
      const index = items.findIndex((item: any) => item.idSpct === spct.idSpct);
      if (index !== -1) {
        // Xóa sản phẩm khỏi mảng
        items.splice(index, 1);
        // Lưu lại mảng đã chỉnh sửa vào localStorage
        localStorage.setItem(this.storageKey, JSON.stringify(items));
      }
    }
    this.updateCartItemCount();
  }

  private updateCartItemCount(): void {
    this.lamMoiDuLieu();
    const totalCount = this.cartItems.length;
    this.cartItemCount.next(totalCount); // Phát giá trị mới
  }

lamMoiDuLieu(){
  const storedCart = localStorage.getItem(this.storageKey);
  if (storedCart) {
    this.cartItems = JSON.parse(storedCart);
  }
}

  /** Hàm call api spct by list id */
  callApiGetSPCTByListId() {
    this.storageKey = 'cart' + this.sessionLoginService.getUser().userName;
    const listIdSpct = this.getListIdSPCT();
    console.log('Danh sách idSpct:', listIdSpct);
    return this.http.post<any>(this.urlApiGetSPCTByListId, listIdSpct, {
      headers: { 'Content-Type': 'application/json' }
    });
  }



}

