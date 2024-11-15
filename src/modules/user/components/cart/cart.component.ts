import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from '../../../../shared/notification.service';
import { CartService } from '../../service/cart.service';
import { SanPhamChiTietResponse } from '../../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  /** Biến hứng dữ liệu SPCT by list id */
  SPCTByListId: (SanPhamChiTietResponse & { selected: boolean, soLuong: number })[] = [];

  /** Biến kiểm soát checkbox */
  selectAllChecked = false;

  constructor(
    private route: ActivatedRoute,
    private notiService: NotificationService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.fetchDataSPCTByListId();
  }

  /** Hàm hiển thị dữ liệu sản phẩm chi tiết */
  fetchDataSPCTByListId() {
    this.cartService.callApiGetSPCTByListId().subscribe({
      next: (response: any) => {
        this.SPCTByListId = response.data.map((spct: SanPhamChiTietResponse) => ({
          ...spct,
          selected: false,
          soLuong: 1 // Thiết lập số lượng mặc định là 1
        }));
        this.notiService.showSuccess(response.message);
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    });
  }

  /** Hàm chọn hoặc bỏ chọn tất cả */
  toggleSelectAll() {
    this.SPCTByListId.forEach((spct) => {
      spct.selected = this.selectAllChecked;
    });
  }

  /** Kiểm tra nếu tất cả sản phẩm được chọn thì "Sản phẩm" checkbox cũng được chọn */
  checkIfAllSelected() {
    this.selectAllChecked = this.SPCTByListId.every((spct) => spct.selected);
  }

  /** Hàm xóa sản phẩm */
  removeItem(spct: any) {
    const index = this.SPCTByListId.indexOf(spct);
    if (index !== -1) {
      this.SPCTByListId.splice(index, 1);
    }
  }

  /** Hàm bắt sự kiện thanh toán */
  handleCartToPayment() {
    this.router.navigate(['/okconde/payment']);
  }
}

