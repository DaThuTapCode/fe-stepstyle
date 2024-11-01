import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NhanVienService } from '../../service/nhan-vien.service'; // Dịch vụ nhân viên
import { Router } from '@angular/router';
import { NhanVienRequest } from '../../../../../models/nhan-vien/request/nhan-vien-request'; // Model yêu cầu nhân viên
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../shared/notification.service';

@Component({
  selector: 'app-employee-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-add.component.html',
  styleUrl: './employee-add.component.scss'
})
export class EmployeeAddComponent implements OnInit {

  newEmployee: NhanVienRequest = {
    idNhanVien: 0,
    maNhanVien: '',
    hoTen: '',
    ngaySinh: null,
    diaChi: '',
    gioiTinh: true,
    soDienThoai: '',
    email: '',
    ghiChu: '',
    anh: '',
    ngayTao: null,
    ngayChinhSua: null,
    trangThai: 'ACTIVE',
  }; // Dữ liệu nhân viên mới

  maNhanVienExists: boolean = false;

  constructor(
    private nhanVienService: NhanVienService, // Dịch vụ nhân viên
    private router: Router,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService
  ) { }

  /** Hàm xử lý sự kiện quay lại danh sách nhân viên */
  handleBackToListEmployee() {
    this.router.navigate(['/admin/employee/list']);
  }

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Cho phép ký tự Unicode chữ và số, khoảng trắng
    const maNVPattern = /^[a-zA-Z0-9]+$/u; // Ký tự đặc biệt

    // Kiểm tra mã
    if (!maNVPattern.test(this.newEmployee.maNhanVien)) {
      this.notificationService.showError('Mã khách hàng không được để trống và không được chứa ký tự đặc biệt.');
      return false;
    }

    if (this.newEmployee.maNhanVien.trim().length <= 4 || this.newEmployee.maNhanVien.trim().length > 11) {
      this.notificationService.showError('Mã nhân viên phải lớn hơn 4 và nhỏ hơn 11 ký tự.');
      return false;
    }

    // Kiểm tra họ tên
    if (this.newEmployee.hoTen.trim().length <= 0) {
      this.notificationService.showError('Họ tên không được để trống.');
      return false;
    }

    if (this.newEmployee.hoTen.trim().length < 6 || this.newEmployee.hoTen.trim().length > 255) {
      this.notificationService.showError('Họ tên phải lớn hơn 6 và nhỏ hơn 255 ký tự.');
      return false;
    }

    if (!specialCharPattern.test(this.newEmployee.hoTen)) {
      this.notificationService.showError('Họ tên không được chứa ký tự đặc biệt.');
      return false;
    }

    // Kiểm tra địa chỉ
    if (this.newEmployee.diaChi.trim().length <= 0) {
      this.notificationService.showError('Địa chỉ không được để trống.');
      return false;
    }

    if (this.newEmployee.diaChi.trim().length < 20 || this.newEmployee.diaChi.trim().length > 500) {
      this.notificationService.showError('Địa phải lớn hơn 20 và nhỏ hơn 500 ký tự.');
      return false;
    }

    // Kiểm tra ngày sinh
    const today = new Date(); // Ngày hiện tại
    if (!this.newEmployee.ngaySinh) {
      this.notificationService.showError('Ngày sinh không được để trống.');
      return false;
    }

    if (new Date(this.newEmployee.ngaySinh) > today) {
      this.notificationService.showError('Ngày sinh không được vượt quá ngày hiện tại.');
      return false;
    }

    // Kiểm tra số điện thoại
    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(this.newEmployee.soDienThoai)) {
      this.notificationService.showError('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
      return false;
    }

    // Kiểm tra email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.newEmployee.email)) {
      this.notificationService.showError('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
      return false;
    }

    if (this.newEmployee.email.trim().length > 255) {
      this.notificationService.showError('Email phải nhỏ hơn 255 ký tự.');
      return false;
    }

    return true; // Tất cả các trường hợp hợp lệ
  }

  /** Hàm thêm nhân viên mới */
  addEmployee() {
    if (this.validateFields()) {
      this.newEmployee.ngaySinh = this.dateUtilsService.convertToBackendFormat(this.newEmployee.ngaySinh);
      // Gửi yêu cầu thêm nhân viên
      this.nhanVienService.addEmployee(this.newEmployee).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess(response.message);
          this.router.navigate(['/admin/employee/list']); // Điều hướng về danh sách nhân viên
        },
        error: (err: any) => {
          console.error('Lỗi khi thêm nhân viên: ', err);
          this.notificationService.showError(err.message);
        }
      });
    }
  }

  ngOnInit(): void {
    // Logic khởi tạo nếu cần
  }
}
