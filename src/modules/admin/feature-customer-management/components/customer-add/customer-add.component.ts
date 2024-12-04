import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../service/khach-hang.service';
import { Router } from '@angular/router';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { GiaoHangNhanhService } from '../../../../../shared/giaohangnhanh/giaohangnhanh.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { DiaChiKhachHangRequest } from '../../../../../models/dia-chi-khach-hang/request/dia-chi-khach-hang-request';

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
    trangThai: 'ACTIVE',
    diaChiKhachHangs: []
  }; // Dữ liệu khách hàng mới

  diaChiKhachHang: DiaChiKhachHangRequest = {
    idDiaChiKhachHang: 0,
    maDiaChiKhachHang: '',
    idTinh: '',
    tenTinh: '',
    idQuanHuyen: '',
    tenQuanHuyen: '',
    maPhuongXa: '',
    tenPhuongXa: '',
    diaChiChiTiet: '',
    trangThai: 'ACTIVE'
  };

  // Biến dữ liệu cho các combobox
  tinhThanhs: any[] = [];
  quanHuyens: any[] = [];
  phuongXas: any[] = [];


  bodyParamsOfQuanHuyen: any = {};

  bodyParamsOfPhuongXa: any = {};

  selectedTinhThanh: any = {};

  selectedQuanHuyen: any = {};

  selectedPhuongXa: any = {};

  maKhachHangExists: boolean = false;

  constructor(
    private khachHangService: KhachHangService,
    private router: Router,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService,
    private GHNService: GiaoHangNhanhService
  ) { }

  /** Lấy danh sách tỉnh thành */
  fetchDataTinhThanhs() {
    this.GHNService.getTinhThanhs().subscribe({
      next: (response: any) => {
        this.tinhThanhs = response.data;
      }
    });
  }

  /** Lấy danh sách huyện khi người dùng chọn tỉnh thành */
  onTinhThanhSelect() {
    this.bodyParamsOfQuanHuyen.province_id = this.selectedTinhThanh.ProvinceID;
    this.GHNService.getQuanHuyen(this.bodyParamsOfQuanHuyen).subscribe({
      next: (response: any) => {
        this.quanHuyens = response.data;
        this.phuongXas = []; // Xóa xã khi thay đổi huyện
        this.selectedQuanHuyen = null;
      }
    });
  }

  /** Lấy danh sách xã khi người dùng chọn huyện */
  onQuanHuyenSelect() {
    this.bodyParamsOfPhuongXa.district_id = this.selectedQuanHuyen.DistrictID;
    this.GHNService.getPhuongXa(this.bodyParamsOfPhuongXa).subscribe({
      next: (response: any) => {
        this.phuongXas = response.data;
        this.selectedPhuongXa = null;
      }
    });
  }

  /** Lưu trữ xã đã chọn */
  onPhuongXaSelect() {

  }

  /** Closemodal để đóng modal */
  closeModal(idBtn: string) {
    const closeModalUpdate = document.getElementById(idBtn);
    if (closeModalUpdate) {
      closeModalUpdate.click();
    }
  }

  /** Hàm xử lý quay lại hoặc đóng modal */
  handleBackToListCustomer() {
    if (this.router.url === '/admin/customer/add') {
      this.router.navigate(['/admin/customer/list']);
    } else {
      this.closeModal('closeModalAddCustomer');
    }
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

    if (this.newCustomer.tenKhachHang.trim().length <= 6 || this.newCustomer.tenKhachHang.trim().length > 255) {
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

    if (new Date(this.newCustomer.ngaySinh) > today) {
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

  /** Hàm reset form */
  resetForm() {
    // Đặt lại thông tin khách hàng
    this.newCustomer = {
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

    // Đặt lại thông tin địa chỉ khách hàng
    this.diaChiKhachHang = {
      idDiaChiKhachHang: 0,
      maDiaChiKhachHang: '',
      idTinh: '',
      tenTinh: '',
      idQuanHuyen: '',
      tenQuanHuyen: '',
      maPhuongXa: '',
      tenPhuongXa: '',
      diaChiChiTiet: '',
      trangThai: 'ACTIVE'
    };

    // Đặt lại các giá trị lựa chọn trong combobox
    this.selectedTinhThanh = {};
    this.selectedQuanHuyen = {};
    this.selectedPhuongXa = {};

    // Đặt lại danh sách huyện và xã
    this.quanHuyens = [];
    this.phuongXas = [];

    // Đặt lại trạng thái của mã khách hàng
    this.maKhachHangExists = false;
  }


  /** Hàm thêm khách hàng mới */
  addCustomer() {
    if (this.validateFields()) {
      this.diaChiKhachHang.tenTinh = this.selectedTinhThanh?.ProvinceName;
      this.diaChiKhachHang.tenQuanHuyen = this.selectedQuanHuyen?.DistrictName;
      this.diaChiKhachHang.tenPhuongXa = this.selectedPhuongXa?.WardName;
      this.diaChiKhachHang.idTinh = this.selectedTinhThanh?.ProvinceID;
      this.diaChiKhachHang.idQuanHuyen = this.selectedQuanHuyen?.DistrictID;
      this.diaChiKhachHang.maPhuongXa = this.selectedPhuongXa?.WardCode;
      this.newCustomer.diaChiKhachHangs[0] = this.diaChiKhachHang;
      this.newCustomer.ngaySinh = this.dateUtilsService.convertToBackendFormat(this.newCustomer.ngaySinh);
      // Gửi yêu cầu thêm khách hàng
      this.khachHangService.addCustomer(this.newCustomer).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess(response.message);
          this.resetForm();
          console.log(response);
          this.sendDataToParent();
          this.handleBackToListCustomer();
          // this.router.navigate(['/admin/customer/list']); // Điều hướng về danh sách khách hàng
        },
        error: (err: any) => {
          console.error('Lỗi khi thêm khách hàng: ', err);
          this.notificationService.showError(err.error.message);
        }
      });
    }
  }

  @Output() notifyParent = new EventEmitter<string>();

  sendDataToParent() {
    const data = 'Dữ liệu từ component con';
    this.notifyParent.emit(data); // Phát sự kiện và gửi dữ liệu lên component cha
  }


  ngOnInit(): void {
    this.fetchDataTinhThanhs();
    this.newCustomer = new KhachHangRequest();
  }

}
