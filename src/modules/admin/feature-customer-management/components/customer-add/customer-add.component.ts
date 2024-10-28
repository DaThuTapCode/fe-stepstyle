import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../service/khach-hang.service';
import { Router } from '@angular/router';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { GiaoHangNhanhService } from '../../../../../shared/giaohangnhanh/giaohangnhanh.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-customer-add',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule, MatSelectModule],
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

  // Biến hứng tỉnh thành
  tinhThanhs: any [] = [];
  selectedTinhThanh: any | null = null;


  maKhachHangExists: boolean = false;

  constructor(
    private khachHangService: KhachHangService,
    private router: Router,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService,
    private GHNService: GiaoHangNhanhService
  ) { }

  /**Cài đặt các thuộc tính cho combobox tỉnh thành */
  dropdownSettingForTinhThanhs = {
    singleSelection: true,
    idField: 'ProvinceID',
    textField: 'ProvinceName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true
  };

  fetchDataTinhThanhs() {
    this.GHNService.getTinhThanhs().subscribe({
      next:(response : any) => {
        this.tinhThanhs = response.data;
        console.log(this.tinhThanhs);
      }
    })
  }

  /**Hàm bắt sự kiện quay lại danh sách khách hàng */
  handleBackToListCustomer() {
    this.router.navigate(['/admin/customer/list'])
  }

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {

    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt

    // Kiểm tra tên
    if (this.newCustomer.tenKhachHang.trim().length <= 0) {
      this.notificationService.showError('Tên khách hàng không được để trống.');
      return false;
    }

    if (this.newCustomer.tenKhachHang.trim().length < 6 || this.newCustomer.tenKhachHang.trim().length > 255) {
      this.notificationService.showError('Tên khách hàng phải lớn hơn 6 và nhỏ hơn 255 ký tự.');
      return false;
    }

    if (!specialCharPattern.test(this.newCustomer.tenKhachHang)) {
      this.notificationService.showError('Tên khách hàng không được chứa ký tự đặc biệt.');
      return false;
    }

    // Kiểm tra ngày sinh
    const today = new Date();
    if (!this.newCustomer.ngaySinh) {
      this.notificationService.showError('Ngày sinh không được để trống.');
      return false;
    }

    if(new Date(this.newCustomer.ngaySinh) > today){
      this.notificationService.showError('Ngày sinh không được vượt quá ngày hiện tại.');
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

    if (this.newCustomer.email.trim().length > 255) {
      this.notificationService.showError('Email phải nhỏ hơn 255 ký tự.');
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
          this.notificationService.showSuccess(response.message);
          console.log(response);
          this.router.navigate(['/admin/customer/list']); // Điều hướng về danh sách khách hàng
        },
        error: (err: any) => {
          console.error('Lỗi khi thêm khách hàng: ', err);
          this.notificationService.showError(err.message);
        }
      });
    }
  }

  ngOnInit(): void {
    this.fetchDataTinhThanhs();
    this.newCustomer = new KhachHangRequest();
  }

}
