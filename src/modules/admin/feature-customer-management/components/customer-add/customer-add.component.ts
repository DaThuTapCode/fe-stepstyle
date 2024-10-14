import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../service/khach-hang.service';
import { Router } from '@angular/router';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-add.component.html',
  styleUrl: './customer-add.component.scss'
})
export class CustomerAddComponent implements OnInit {

  newCustomer: KhachHangRequest = {
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
    trangThai: 'ACTIVE'
  }; // Dữ liệu khách hàng mới

  maKhachHangExists: boolean = false;

  constructor(
    private khachHangService: KhachHangService,
    private router: Router
  ) { }


  /** Hàm thêm khách hàng mới */
  addCustomer() {
    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(this.newCustomer.soDienThoai)) {
      alert('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
      return;
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.newCustomer.email)) {
      alert('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
      return;
    }

    // Kiểm tra mã khách hàng có trùng không
    this.khachHangService.checkMaKhachHang(this.newCustomer.maKhachHang).subscribe({
      next: (exists: boolean) => {
        if (exists) {
          this.maKhachHangExists = true; // Nếu mã khách hàng đã tồn tại
        } else {
          // Gửi yêu cầu thêm khách hàng nếu mã không trùng
          this.khachHangService.addCustomer(this.newCustomer).subscribe({
            next: (response: any) => {
              alert('Thêm khách hàng thành công!');
              this.router.navigate(['/admin/customer/list']); // Điều hướng về danh sách khách hàng
            },
            error: (err: any) => {
              console.error('Lỗi khi thêm khách hàng: ', err);
            }
          });
        }
      },
      error: (err: any) => {
        console.error('Lỗi khi kiểm tra mã khách hàng: ', err);
      }
    });
  }

  ngOnInit(): void {
    // Có thể thêm logic khởi tạo nếu cần
  }
}
