import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SanPhamResponse } from '../../../../models/san-pham/response/san-pham-response';
import { CommonModule } from '@angular/common';
import { SanPhamService } from '../../../admin/feature-product-management/services/san-pham.service';
import { SanPhamSearch } from '../../../../models/san-pham/request/san-pham-search';
import { Pagination } from '../../../../shared/type/pagination';
import { NotificationService } from '../../../../shared/notification.service';
import { FormsModule } from '@angular/forms';
import { SanPhamChiTietResponse } from '../../../../models/san-pham-chi-tiet/response/san-pham-chi-tiet-response';
import { ThuongHieuService } from '../../../admin/feature-product-management/services/thuong-hieu.service';
import { DanhMucService } from '../../../admin/feature-product-management/services/danh-muc.service';
import { ThuongHieuResponse } from '../../../../models/thuong-hieu/response/thuong-hieu-response';
import { DanhMucResponse } from '../../../../models/danh-muc/response/danh-muc-response';

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
    size: 8,
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
  // Các biến hứng dữ liệu cho các combobox
  thuongHieus: ThuongHieuResponse[] = [];
  danhMucs: DanhMucResponse[] = [];
  constructor(
    private thuongHieuService: ThuongHieuService,
    private danhMucService: DanhMucService,
    private router: Router,
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

  /** Hàm tải dữ liệu cho danh sách thương hiệu*/
  fetchThuongHieus() {
    this.thuongHieuService.getAllThuongHieu().subscribe({
      next: (res: any) => {
        this.thuongHieus = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách thương hiệu: ', err);
      }
    })
  }

  /** Hàm tải dữ liệu cho danh sách danh mục*/
  fetchDanhMuc() {
    this.danhMucService.getAllDanhMuc().subscribe({
      next: (res: any) => {
        this.danhMucs = res.data;
      },
      error: err => {
        console.log('Lỗi khi tải dữ liệu danh sách danh mục: ', err);
      }
    })
  }

  /**Reset lại kết quả tìm kiếm */
  resetSanPhamSearch() {
    this.paginatinonOfSP.page = 0;
    this.sanPhamSearch = {
      maSanPham: null,
      tenSanPham: null,
      ngayTaoStart: null,
      ngayTaoEnd: null,
      idDanhMuc: null,
      idThuongHieu: null
    };
    this.fetchDataSearchSanPham();
  }
  /**Bắt sự kiện tìm kiếm sản phẩm */
  handleSearchSanPham(){
    this.paginatinonOfSP.page = 0;
    this.fetchDataSearchSanPham();
  }

  /**Hàm bắt sự kiện đổi trang bảng sản phẩm */
  handlePageSPCTChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfSP.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfSP.page += 1;
    }
    this.fetchDataSearchSanPham();
  }

  

/** Hàm trả ra ảnh chi tiết sản phẩm */
getAnhSanPhamChiTiet(sanPham: SanPhamResponse): string {
  let currentImage = '/noimage.png'; // Đường dẫn ảnh mặc định
  for (const spct of sanPham.sanPhamChiTiets || []) {
    if (spct.anh) {
      currentImage = spct.anh;
      break; // Thoát vòng lặp nếu tìm được ảnh
    }
  }
  return currentImage;
}
getGiaMin(spct: SanPhamChiTietResponse[]): number | null {
  if (!spct || spct.length === 0) {
    return null; // Không có dữ liệu
  }
  return Math.min(...spct.map(item => item.gia));
}

getGiaMax(spct: SanPhamChiTietResponse[]): number | null {
  if (!spct || spct.length === 0) {
    return null; // Không có dữ liệu
  }
  return Math.max(...spct.map(item => item.gia));
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
    this.fetchDanhMuc();
    this.fetchThuongHieus();
    this.fetchDataSearchSanPham();
  }

}
