import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SanPhamResponse } from '../../../../models/san-pham/response/san-pham-response';
import { CommonModule } from '@angular/common';
import { DetailProductService } from '../../service/detail-product.service';
import { CartService } from '../../service/cart.service';
import { SanPhamService } from '../../../admin/feature-product-management/services/san-pham.service';
import { SanPhamSearch } from '../../../../models/san-pham/request/san-pham-search';
import { Pagination } from '../../../../shared/type/pagination';
import { NotificationService } from '../../../../shared/notification.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home-user.component.html',
  styleUrl: './home-user.component.scss'
})
export class HomeUserComponent implements OnInit {

  sanPhamById: SanPhamResponse = new SanPhamResponse;
  sanPhams: SanPhamResponse[] = []; //Biến hứng dữ liệu
  //Phân trang 
  paginatinonOfSP: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  sanPhamSearch: SanPhamSearch = {//Biến gửi dữ liệu tìm kiếm
    maSanPham: null,
    tenSanPham: null,
    ngayTaoStart: null,
    ngayTaoEnd: null,
    idDanhMuc: null,
    idThuongHieu: null
  };

  /**id san pham */
  idSanPham!: number;

  constructor(
    private router: Router,
    private cartService: CartService,
    private sanPhamService: SanPhamService,
    private notificationService: NotificationService,
  ) { }

  /** Hàm bắt sự kiện chuyển hướng xem chi tiết sản phẩm */
  navigate(idSanPham: number) {
    this.router.navigate([`/okconde/detail-product/${idSanPham}`]);
  }

  hhe(id: number) {
    this.router.navigate([`/okconde/payment/${id}`]);
  }

  /** Hàm bắt sự kiện giỏ hàng */
  fetchCart() {
    this.router.navigate([`/okconde/cart`])
  }

  /** Hàm bắt sự kiện ghi dữ liệu giỏ hàng */
  handlecart(idSpct: number) {
    this.cartService.addToCart(idSpct)
  }


/** Hàm trả ra ảnh chi tiết sản phẩm */
getAnhSanPhamChiTiet(sanPham: SanPhamResponse): string {
  let currentImage = 'default-image-path'; // Đường dẫn ảnh mặc định
  for (const spct of sanPham.sanPhamChiTiets || []) {
    if (spct.anh) {
      currentImage = spct.anh;
      break; // Thoát vòng lặp nếu tìm được ảnh
    }
  }
  return currentImage;
}


  /** Hàm tìm kiếm phân trang sản phẩm */
  fetchDataSearchSanPham() {
    this.sanPhamService.searchPageProduct(this.sanPhamSearch, this.paginatinonOfSP.page, this.paginatinonOfSP.size).subscribe({
      next: (response: any) => {
        this.sanPhams = response.data.content;
        this.paginatinonOfSP.totalPages = response.data.totalPages;
        this.paginatinonOfSP.totalElements = response.data.totalElements;
        this.paginatinonOfSP.page = response.data.pageable.pageNumber;
        this.paginatinonOfSP.first = response.data.first;
        this.paginatinonOfSP.last = response.data.last;
        console.log("SanPhamPage: ", response);
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message)
      }
    });
  }

  ngOnInit(): void {
    this.fetchDataSearchSanPham();
  }

}
