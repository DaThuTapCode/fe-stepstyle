import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../service/khach-hang.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.scss'
})
export class CustomerUpdateComponent implements OnInit{

  //Biến hứng dữ liệu
  khachHangs: KhachHangRequest[] = [];

  constructor(
    private khachHangService: KhachHangService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

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
    trangThai: 'ACTIVE'
  }; // Dữ liệu khách hàng được chọn để chỉnh sửa

  /** Hàm tải dữ liệu khách hàng theo ID */
  fetchCustomerById(id: number) {
    this.khachHangService.getCustomerById(id).subscribe({
      next: (response: any) => {
        this.selectedCustomer = response.data;
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy thông tin khách hàng: ', err);
      }
    });
  }

  /** Hàm cập nhật thông tin khách hàng */
  updateCustomer() {
    if (!this.selectedCustomer.tenKhachHang 
      // || !this.selectedCustomer.ngaySinh 
      || !this.selectedCustomer.soDienThoai || !this.selectedCustomer.email ) {
      alert('Vui lòng nhập đầy đủ thông tin.');
      return;
    }
  
    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(this.selectedCustomer.soDienThoai)) {
      alert('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
      return;
    }
  
    // Kiểm tra định dạng email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.selectedCustomer.email)) {
      alert('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
      return;
    }
  
    // Gửi yêu cầu cập nhật nếu tất cả các trường hợp đều hợp lệ
    this.khachHangService.updateCustomer(this.selectedCustomer.idKhachHang, this.selectedCustomer).subscribe({
      next: (response: any) => {
        alert('Cập nhật thành công!');
        this.router.navigate(['/admin/customer/list']); // Điều hướng lại danh sách khách hàng
      },
      error: (err: any) => {
        console.error('Lỗi khi cập nhật khách hàng: ', err);
      }
    });
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
