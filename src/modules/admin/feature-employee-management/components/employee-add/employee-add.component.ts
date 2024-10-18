import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NhanVienService } from '../../service/nhan-vien.service'; // Dịch vụ nhân viên
import { Router } from '@angular/router';
import { NhanVienRequest } from '../../../../../models/nhan-vien/request/nhan-vien-request'; // Model yêu cầu nhân viên
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';

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
    private dateUtilsService: DateUtilsService
  ) { }

  /** Hàm xử lý sự kiện quay lại danh sách nhân viên */
  handleBackToListEmployee() {
    this.router.navigate(['/admin/employee/list']);
  }

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Cho phép ký tự Unicode chữ và số, khoảng trắng
    const maNVPattern = /^[a-zA-Z0-9]+$/u; // Chỉ cho phép chữ cái và số không dấu

    // Kiểm tra mã nhân viên
    if (!maNVPattern.test(this.newEmployee.maNhanVien)) {
      alert(`Mã nhân viên không được để trống và không được chứa ký tự đặc biệt.`);
      return false;
    }

    // Kiểm tra họ tên
    if (this.newEmployee.hoTen.trim().length <= 0) {
      alert(`Họ tên không được để trống.`);
      return false;
    }

    if (!specialCharPattern.test(this.newEmployee.hoTen)) {
      alert(`Họ tên không được chứa ký tự đặc biệt.`);
      return false;
    }

    // Kiểm tra địa chỉ
    if (this.newEmployee.diaChi.trim().length <= 0) {
      alert(`Địa chỉ không được để trống.`);
      return false;
    }

    // Kiểm tra số điện thoại
    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(this.newEmployee.soDienThoai)) {
      alert('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
      return false;
    }

    // Kiểm tra email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.newEmployee.email)) {
      alert('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
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
          alert('Thêm nhân viên thành công!');
          this.router.navigate(['/admin/employee/list']); // Điều hướng về danh sách nhân viên
        },
        error: (err: any) => {
          console.error('Lỗi khi thêm nhân viên: ', err);
        }
      });
    }
  }

  ngOnInit(): void {
    // Logic khởi tạo nếu cần
  }
}
