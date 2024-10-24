import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../service/khach-hang.service';
import { Router } from '@angular/router';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../shared/notification.service';

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
    private router: Router,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService
  ) { }

  /**Hàm bắt sự kiện quay lại danh sách khách hàng */
  handleBackToListCustomer() {
    this.router.navigate(['/admin/customer/list'])
  }

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {

    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt
    const maKHPattern = /^[a-zA-Z0-9]+$/u; // Ký tự đặc biệt

    // Kiểm tra mã
    if (!maKHPattern.test(this.newCustomer.maKhachHang)) {
      this.notificationService.showError('Mã khách hàng không được để trống và không được chứa ký tự đặc biệt.');
      return false;
    }

    if (this.newCustomer.tenKhachHang.trim().length <= 0) {
      this.notificationService.showError('Tên khách hàng không được để trống.');
      return false;
    }

    // Kiểm tra tên
    if (!specialCharPattern.test(this.newCustomer.tenKhachHang)) {
      this.notificationService.showError('Tên khách hàng không được chứa ký tự đặc biệt.');
      return false;
    }

    // Kiểm tra ngày sinh
    if (!this.newCustomer.ngaySinh) {
      this.notificationService.showError('Ngày sinh không được để trống.');
      return false;
    }

    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(this.newCustomer.soDienThoai)) {
      this.notificationService.showError('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
      return false;
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.newCustomer.email)) {
      this.notificationService.showError('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
      return false;
    }

    return true; // Tất cả các trường hợp lệ
  }

  /** Hàm thêm khách hàng mới */
  addCustomer() {
    if (this.validateFields()) {
      this.newCustomer.ngaySinh = this.dateUtilsService.convertToBackendFormat(this.newCustomer.ngaySinh);
      // Gửi yêu cầu thêm khách hàng
      this.khachHangService.addCustomer(this.newCustomer).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess('Thêm khách hàng thành công!');
          this.router.navigate(['/admin/customer/list']); // Điều hướng về danh sách khách hàng
        },
        error: (err: any) => {
          console.error('Lỗi khi thêm khách hàng: ', err);
        }
      });
    }
  }

  ngOnInit(): void {
    // Khởi tạo lại khách hàng nếu cần
    this.newCustomer = new KhachHangRequest();
  }

}
