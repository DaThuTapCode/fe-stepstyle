import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { KhachHangService } from '../../service/khach-hang.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { KhachHangResponse } from '../../../../../models/khach-hang/response/khach-hang-response';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.scss'
})
export class CustomerListComponent implements OnInit{

  //Biến hứng dữ liệu
  khachHangs: KhachHangResponse[] = [];
  // Các biến phân trang
  /**Phân trang */
  size: number = 10;
  page: number = 0;
  totalPages: number = 1;  /**Bắt sự kiện thay đổi trang */
  dataSearch = {
    tenKhachHang: '',
    soDienThoai: ''
  }
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataKhachHangs();
  }

  constructor(
    private khachHangService: KhachHangService,
    private router: Router
  ) { }

  /**Hàm tải dữ liệu danh sách khách hàng */
  fetchDataKhachHangs() {
    this.khachHangService.getCustomersByPage(this.dataSearch, this.page, this.size).subscribe({
      next: (response: any) => {
        this.khachHangs = response.data.content;
        this.totalPages = response.data.totalPages;
        console.log('KhachHangs', this.khachHangs);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách khách hàng: ', err);
      }
    });
  }

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

/** Hàm xử lý khi xem chi tiết khách hàng */
handleDetailCustomer(khachHang: any) {
  this.selectedCustomer = khachHang;
}

/** Hàm xử lý khi chỉnh sửa khách hàng */
handleUpdateCustomer(khachHang: any) {
  // Điều hướng đến route cập nhật khách hàng
  this.router.navigate(['/admin/customer/update/' + khachHang.idKhachHang]); 
}

// Hàm điều hướng đến trang thêm khách hàng
navigateToAddCustomer(): void {
  this.router.navigate(['/admin/customer/add']);
}

  ngOnInit(): void {
    this.fetchDataKhachHangs();
  }
}
