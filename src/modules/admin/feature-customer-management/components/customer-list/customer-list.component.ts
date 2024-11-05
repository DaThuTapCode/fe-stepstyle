import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KhachHangService } from '../../service/khach-hang.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KhachHangResponse } from '../../../../../models/khach-hang/response/khach-hang-response';
import { Pagination } from '../../../../../shared/type/pagination';
import { SttUtilsService } from '../../../../../shared/helper/stt-utils.service';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit {

  //Biến hứng dữ liệu
  khachHangs: KhachHangResponse[] = [];

  selectedCustomer: KhachHangResponse = {
    idKhachHang: 0,
    maKhachHang: '',
    tenKhachHang: '',
    soDienThoai: '',
    email: '',
    ngaySinh: null,
    gioiTinh: true,
    ghiChu: '',
    ngayTao: null,
    ngayChinhSua: null,
    trangThai: 'ACTIVE',
    diaChiKhachHangs: []
  }; // Dữ liệu khách hàng được chọn để xem hoặc chỉnh sửa

  //Phân trang 
  paginatinonOfCustomer: Pagination = {
    size: 10,
    page: 0,
    totalElements: 0,
    totalPages: 0,
    first: false,
    last: false
  }

  // Dữ liệu tìm kiếm
  khachHangSearchRequest = {
    maKhachHang: '',
    tenKhachHang: '',
    soDienThoai: ''
  }

  constructor(
    private khachHangService: KhachHangService,
    private router: Router,
    private sttUtilsService: SttUtilsService
  ) { }

  /** Hàm tìm kiếm khách hàng */
  searchCustomers() {
    this.paginatinonOfCustomer.page = 0; // Reset lại trang khi bắt đầu tìm kiếm
    this.fetchDataKhachHangs();
  }

  /**Hàm tải dữ liệu danh sách khách hàng */
  fetchDataKhachHangs() {
    this.khachHangService.getCustomersByPage(this.khachHangSearchRequest, this.paginatinonOfCustomer.page, this.paginatinonOfCustomer.size).subscribe({
      next: (response: any) => {
        this.khachHangs = response.data.content;
        this.paginatinonOfCustomer.totalPages = response.data.totalPages;
        this.paginatinonOfCustomer.totalElements = response.data.totalElements;
        this.paginatinonOfCustomer.page = response.data.pageable.pageNumber;
        this.paginatinonOfCustomer.first = response.data.first;
        this.paginatinonOfCustomer.last = response.data.last;
        console.log('KhachHangs', this.khachHangs);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách khách hàng: ', err);
      }
    });
  }

  /**Tính stt */
  tinhSTT(page: number, size: number, current: number): number {
    return this.sttUtilsService.tinhSTT(page, size, current);
  }
  /**Hàm bắt sự kiện đổi trang bảng sản phẩm */
  handlePageCustomerChange(type: string) {
    if (type === 'pre') {
      this.paginatinonOfCustomer.page -= 1;
    } else if (type === 'next') {
      this.paginatinonOfCustomer.page += 1;
    }
    this.fetchDataKhachHangs();
  }

  /** Hàm reset tìm kiếm */
  resetSearch() {
    this.khachHangSearchRequest = {
      maKhachHang: '',
      tenKhachHang: '',
      soDienThoai: ''
    };
    this.searchCustomers();
  }

  /** Hàm xử lý khi xem chi tiết khách hàng */
  handleDetailCustomer(khachHangs: any) {
    this.selectedCustomer = khachHangs;
  }

  /** Hàm xử lý khi chỉnh sửa khách hàng */
  handleUpdateCustomer(khachHangs: any) {
    // Điều hướng đến route cập nhật khách hàng
    this.router.navigate(['/admin/customer/update/' + khachHangs.idKhachHang]);
  }

  // Hàm điều hướng đến trang thêm khách hàng
  navigateToAddCustomer(): void {
    this.router.navigate(['/admin/customer/add']);
  }

  ngOnInit(): void {
    this.fetchDataKhachHangs();
  }
}
