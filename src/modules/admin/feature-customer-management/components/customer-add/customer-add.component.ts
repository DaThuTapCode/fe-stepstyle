import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../service/khach-hang.service';
import { Router } from '@angular/router';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';

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
    private dateUtilsService: DateUtilsService
  ) { }

  /**Hàm bắt sự kiện quay lại danh sách khách hàng */
  handleBackToListCustomer() {
    this.router.navigate(['/admin/customer/list'])
  }

  /** Hàm thêm khách hàng mới */
  addCustomer() {
    if (this.validateFields()) {
      this.newCustomer.ngaySinh = this.dateUtilsService.convertToBackendFormat(this.newCustomer.ngaySinh);
      // Gửi yêu cầu thêm khách hàng
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
  }

  

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {

    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u; // Ký tự đặc biệt
    const maKHPattern = /^[a-zA-Z0-9]+$/u; // Ký tự đặc biệt

    if(!maKHPattern.test(this.newCustomer.maKhachHang)){
      alert(`Mã khách hàng không được để trống và không được chứa ký tự đặc biệt.`);
      return false;
    }

    if(this.newCustomer.tenKhachHang.trim().length <= 0){
      alert(`Tên khách hàng không được để trống.`);
      return false;
    }

    if(!specialCharPattern.test(this.newCustomer.tenKhachHang)){
      alert(`Tên khách hàng không được chứa ký tự đặc biệt.`);
      return false;
    }

    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(this.newCustomer.soDienThoai)) {
      alert('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
      return false;
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.newCustomer.email)) {
      alert('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
      return false;
    }

    if(!specialCharPattern.test(this.newCustomer.ghiChu)){
      alert(`Ghi chú không được không được chứa ký tự đặc biệt.`);
      return false;
    }

    return true; // Tất cả các trường hợp lệ
  }

  ngOnInit(): void {
    // Khởi tạo lại khách hàng nếu cần
    this.newCustomer = new KhachHangRequest();
  }

}
