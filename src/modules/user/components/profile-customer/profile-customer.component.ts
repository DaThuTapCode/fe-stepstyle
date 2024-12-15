import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../../admin/feature-customer-management/service/khach-hang.service';
import { KhachHangResponse } from '../../../../models/khach-hang/response/khach-hang-response';
import { NotificationComponent } from "../../../../shared/notification/notification.component";
import { NotificationService } from '../../../../shared/notification.service';
import { SessionloginService } from '../../../../core/auth/sessionlogin.service';
import { KhachHangRequest } from '../../../../models/khach-hang/request/khach-hang-request';
import { DateUtilsService } from '../../../../shared/helper/date-utils.service';
import { HamDungChung } from '../../../../shared/helper/ham-dung-chung';

@Component({
  selector: 'app-profile-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './profile-customer.component.html',
  styleUrl: './profile-customer.component.scss'
})
export class ProfileCustomerComponent implements OnInit {

  customer: KhachHangResponse = new KhachHangResponse();

  customerUpdate: KhachHangRequest = new KhachHangRequest();


    /**Tài dữ liệu khách hàng theo id */
    fetchKhachHangById(idKhachHang: number): void {
      this.khachHangService.getCustomerById(idKhachHang).subscribe({
        next: (response: any) => {
          this.customer = response.data;
        },
        error: (err: any) => {
          this.notiService.showError('Bạn chưa đăng nhập với tài khoản khách hàng!')
        }
      })
    }

    /**Hàm bắt sự kiện gán dữ liệu update khách hàng */
    handleSetDataUpdate(){
      this.customerUpdate.tenKhachHang = this.customer.tenKhachHang;
      this.customerUpdate.email = this.customer.email;
      this.customerUpdate.soDienThoai = this.customer.soDienThoai;
      this.customerUpdate.ngaySinh = this.customer.tenKhachHang;
      this.customerUpdate.ngaySinh = this.dateUtilsService.convertToISOFormat(this.customer.ngaySinh + '');
    }

    handleConfirmUpdate(){
      if(!this.validateFields()) {
        return;
      }
      if(!confirm('Bạn có muốn chỉnh sửa thông tin?')){
        return;
      }
      this.customerUpdate.ngaySinh = this.dateUtilsService.convertToBackendFormat(this.customerUpdate.ngaySinh);
      this.khachHangService.updateCustomer(this.customer.idKhachHang, this.customerUpdate).subscribe({
        next: (response: any) => {
          this.notiService.showSuccess(response.message);
          this.fetchKhachHangById(this.customer.idKhachHang);
          this.hamDungChung.closeModal('closeModalUpdateThongTin')
        },
        error: (error: any) => {
          this.notiService.showError(error.error.message);
        }
      })
    }

    /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {

    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u;

    // Kiểm tra tên
    if (this.customerUpdate.tenKhachHang.trim().length <= 0) {
      this.notiService.showError('Tên khách hàng không được để trống.');
      return false;
    }

    if (this.customerUpdate.tenKhachHang.trim().length < 6 || this.customerUpdate.tenKhachHang.trim().length > 255) {
      this.notiService.showError('Tên khách hàng phải lớn hơn 6 và nhỏ hơn 255 ký tự.');
      return false;
    }

    if (!specialCharPattern.test(this.customerUpdate.tenKhachHang)) {
      this.notiService.showError('Tên khách hàng không được chứa ký tự đặc biệt.');
      return false;
    }

    // Kiểm tra ngày sinh
    const today = new Date();
    if (!this.customerUpdate.ngaySinh) {
      this.notiService.showError('Ngày sinh không được để trống.');
      return false;
    }

    if (new Date(this.customerUpdate.ngaySinh) > today) {
      this.notiService.showError('Ngày sinh không được vượt quá ngày hiện tại.');
      return false;
    }

    // Kiểm tra định dạng số điện thoại
    const phonePattern = /^0[0-9]{9}$/;
    if (!phonePattern.test(this.customerUpdate.soDienThoai)) {
      this.notiService.showError('Số điện thoại không hợp lệ. Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số.');
      return false;
    }

    // Kiểm tra định dạng email
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.customerUpdate.email)) {
      this.notiService.showError('Email không hợp lệ. Vui lòng nhập đúng định dạng email.');
      return false;
    }

    if (this.customerUpdate.email.trim().length > 255) {
      this.notiService.showError('Email phải nhỏ hơn 255 ký tự.');
      return false;
    }

    return true; // Tất cả các trường hợp lệ

  }

  constructor(
    private khachHangService: KhachHangService,
    private notiService: NotificationService,
    private sessionLogin: SessionloginService,
    private dateUtilsService: DateUtilsService,
    public hamDungChung: HamDungChung,
  ){

  }

  ngOnInit(): void {
    this.fetchKhachHangById(this.sessionLogin.getUser().id);
  }

  
}
