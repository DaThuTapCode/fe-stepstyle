import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../service/khach-hang.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../shared/notification.service';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.scss'
})
export class CustomerUpdateComponent implements OnInit {

  selectedCustomer: KhachHangRequest = {
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
  };

  constructor(
    private khachHangService: KhachHangService,
    private route: ActivatedRoute,
    private router: Router,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService
  ) { }

  /**Hàm bắt sự kiện quay lại danh sách khách hàng */
  handleBackToListCustomer() {
    this.router.navigate(['/admin/customer/list']);
  }

  /** Hàm tải dữ liệu khách hàng theo ID */
  fetchCustomerById(id: number) {
    this.khachHangService.getCustomerById(id).subscribe({
      next: (response: any) => {
        this.selectedCustomer = response.data;
        this.selectedCustomer.ngaySinh = this.dateUtilsService.convertToISOFormat(this.selectedCustomer.ngaySinh);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy thông tin khách hàng: ', err);
      }
    });
  }

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {

    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u;

    // Kiểm tra tên
    if (this.selectedCustomer.tenKhachHang.trim().length <= 0) {
      this.notificationService.showError('Tên khách hàng không được để trống.');
      return false;
    }

    if (this.selectedCustomer.tenKhachHang.trim().length < 6 || this.selectedCustomer.tenKhachHang.trim().length > 255) {
      this.notificationService.showError('Tên khách hàng phải lớn hơn 6 và nhỏ hơn 255 ký tự.');
      return false;
    }

    if (!specialCharPattern.test(this.selectedCustomer.tenKhachHang)) {
      this.notificationService.showError('Tên khách hàng không được chứa ký tự đặc biệt.');
      return false;
    }

    // Kiểm tra ngày sinh
    const today = new Date();
    if (!this.selectedCustomer.ngaySinh) {
      this.notificationService.showError('Ngày sinh không được để trống.');
      return false;
    }

    if(new Date(this.selectedCustomer.ngaySinh) > today){
      this.notificationService.showError('Ngày sinh không được vượt quá ngày hiện tại.');
      return false;
    }

    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(this.selectedCustomer.soDienThoai)) {
      this.notificationService.showError('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
      return false;
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.selectedCustomer.email)) {
      this.notificationService.showError('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
      return false;
    }

    if (this.selectedCustomer.email.trim().length > 255) {
      this.notificationService.showError('Email phải nhỏ hơn 255 ký tự.');
      return false;
    }

    return true; // Tất cả các trường hợp lệ

  }

  /** Hàm cập nhật thông tin khách hàng */
  updateCustomer() {
    if (this.validateFields()) {
      this.selectedCustomer.ngaySinh = this.dateUtilsService.convertToBackendFormat(this.selectedCustomer.ngaySinh);
      // Gửi yêu cầu cập nhật nếu tất cả các trường hợp đều hợp lệ
      this.khachHangService.updateCustomer(this.selectedCustomer.idKhachHang, this.selectedCustomer).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess(response.message);
          this.router.navigate(['/admin/customer/list']);
        },
        error: (err: any) => {
          console.error('Lỗi khi cập nhật khách hàng: ', err);
          this.notificationService.showError(err.message);
        }
      });
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.fetchCustomerById(id);  // Lấy dữ liệu khách hàng
      }
    });
  }
}
