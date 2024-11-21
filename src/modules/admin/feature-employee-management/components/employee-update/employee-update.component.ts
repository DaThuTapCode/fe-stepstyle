import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NhanVienService } from '../../service/nhan-vien.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NhanVienRequest } from '../../../../../models/nhan-vien/request/nhan-vien-request';
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../shared/notification.service';

@Component({
  selector: 'app-employee-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-update.component.html',
  styleUrl: './employee-update.component.scss'
})
export class EmployeeUpdateComponent implements OnInit {

  // Biến hứng dữ liệu nhân viên
  selectedEmployee: NhanVienRequest = {
    idNhanVien: 0,
    maNhanVien: '',
    matKhau: '',
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
    trangThai: 'ACTIVE'
  };

  constructor(
    private nhanVienService: NhanVienService,
    private route: ActivatedRoute,
    private router: Router,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService
  ) { }

  /** Hàm xử lý sự kiện quay lại danh sách nhân viên */
  handleBackToListEmployee() {
    this.router.navigate(['/admin/employee/list']);
  }

  /** Hàm tải dữ liệu nhân viên theo ID */
  fetchEmployeeById(id: number) {
    this.nhanVienService.getEmployeeById(id).subscribe({
      next: (response: any) => {
        this.selectedEmployee = response.data;
        this.selectedEmployee.ngaySinh = this.dateUtilsService.convertToISOFormat(this.selectedEmployee.ngaySinh);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy thông tin nhân viên: ', err);
      }
    });
  }

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Cho phép ký tự Unicode chữ và số, khoảng trắng

    // Kiểm tra họ tên
    if (this.selectedEmployee.hoTen.trim().length <= 0) {
      this.notificationService.showError('Họ tên không được để trống.');
      return false;
    }

    if (this.selectedEmployee.hoTen.trim().length < 6 || this.selectedEmployee.hoTen.trim().length > 255) {
      this.notificationService.showError('Họ tên phải lớn hơn 6 và nhỏ hơn 255 ký tự.');
      return false;
    }

    if (!specialCharPattern.test(this.selectedEmployee.hoTen)) {
      this.notificationService.showError('Họ tên không được chứa ký tự đặc biệt.');
      return false;
    }

    // Kiểm tra địa chỉ
    if (this.selectedEmployee.diaChi.trim().length <= 0) {
      this.notificationService.showError('Địa chỉ không được để trống.');
      return false;
    }

    if (this.selectedEmployee.diaChi.trim().length < 20 || this.selectedEmployee.diaChi.trim().length > 500) {
      this.notificationService.showError('Địa phải lớn hơn 20 và nhỏ hơn 500 ký tự.');
      return false;
    }

    // Kiểm tra ngày sinh
    const today = new Date(); // Ngày hiện tại
    if (!this.selectedEmployee.ngaySinh) {
      this.notificationService.showError('Ngày sinh không được để trống.');
      return false;
    }

    if (new Date(this.selectedEmployee.ngaySinh) > today) {
      this.notificationService.showError('Ngày sinh không được vượt quá ngày hiện tại.');
      return false;
    }

    // Kiểm tra số điện thoại
    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(this.selectedEmployee.soDienThoai)) {
      this.notificationService.showError('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
      return false;
    }

    // Kiểm tra email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.selectedEmployee.email)) {
      this.notificationService.showError('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
      return false;
    }

    if (this.selectedEmployee.email.trim().length > 255) {
      this.notificationService.showError('Email phải nhỏ hơn 255 ký tự.');
      return false;
    }

    return true; // Tất cả các trường hợp hợp lệ
  }

  /** Hàm cập nhật thông tin nhân viên */
  updateEmployee() {
    if (this.validateFields()) {
      this.selectedEmployee.ngaySinh = this.dateUtilsService.convertToBackendFormat(this.selectedEmployee.ngaySinh);
      // Gửi yêu cầu cập nhật nếu tất cả các trường hợp đều hợp lệ
      this.nhanVienService.updateEmployee(this.selectedEmployee.idNhanVien, this.selectedEmployee).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess(response.message);
          this.router.navigate(['/admin/employee/list']); // Điều hướng lại danh sách nhân viên
        },
        error: (err: any) => {
          console.error('Lỗi khi cập nhật nhân viên: ', err);
          this.notificationService.showError(err.message);
        }
      });
    }
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.fetchEmployeeById(id);  // Lấy dữ liệu nhân viên
      }
    });
  }
}
