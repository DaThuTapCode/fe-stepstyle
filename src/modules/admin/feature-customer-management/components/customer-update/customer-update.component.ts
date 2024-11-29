import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../service/khach-hang.service';
import { ActivatedRoute, Router } from '@angular/router';
import { KhachHangRequest } from '../../../../../models/khach-hang/request/khach-hang-request';
import { DateUtilsService } from '../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../shared/notification.service';
import { DiaChiKhachHangRequest } from '../../../../../models/dia-chi-khach-hang/request/dia-chi-khach-hang-request';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { GiaoHangNhanhService } from '../../../../../shared/giaohangnhanh/giaohangnhanh.service';

@Component({
  selector: 'app-customer-update',
  standalone: true,
  imports: [CommonModule, FormsModule, NgMultiSelectDropDownModule],
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
  tinhThanh: any[] = [];
  quanHuyen: any[] = [];
  phuongXa: any[] = [];


  bodyParamsOfQuanHuyen: any = {};

  bodyParamsOfPhuongXa: any = {};

  selectedTinhThanh: any = {};

  selectedQuanHuyen: any = {};

  selectedPhuongXa: any = {};

  /**Cài đặt các thuộc tính cho combobox tỉnh thành */
  dropdownSettingForTinhThanhs = {
    singleSelection: true,
    idField: 'ProvinceID',
    textField: 'ProvinceName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true,
    closeDropDownOnSelection: true // Đóng khi chọn xong
  };

  /**Cài đặt các thuộc tính cho combobox huyện */
  dropdownSettingForHuyens = {
    singleSelection: true,
    idField: 'DistrictID',
    textField: 'DistrictName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true,
    closeDropDownOnSelection: true // Đóng khi chọn xong
  };

  /**Cài đặt các thuộc tính cho combobox xã */
  dropdownSettingForXas = {
    singleSelection: true,
    idField: 'WardCode',
    textField: 'WardName',
    selectAllText: 'Chọn tất cả',
    unSelectAllText: 'Bỏ chọn tất cả',
    itemsShowLimit: 300,
    allowSearchFilter: true,
    closeDropDownOnSelection: true // Đóng khi chọn xong
  };

    resetForm() {
      // Đặt lại thông tin địa chỉ khách hàng
      this.selectedTinhThanh = null;
      this.selectedQuanHuyen = null;
      this.selectedPhuongXa = null;
      this.diaChiKhachHang.diaChiChiTiet = '';
    }

  constructor(
    private khachHangService: KhachHangService,
    private route: ActivatedRoute,
    private router: Router,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService,
    private GHNService: GiaoHangNhanhService
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

    if (new Date(this.selectedCustomer.ngaySinh) > today) {
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

  /** Hàm kiểm tra tính hợp lệ của địa chỉ */
  validateAddress(): boolean {

    // Kiểm tra các trường không được có ký tự đặc biệt và không được khoảng trống
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u;

    if (!this.selectedTinhThanh || !this.selectedTinhThanh.length) {
      this.notificationService.showError('Vui lòng chọn tỉnh thành.');
      return false;
    }

    if (!this.selectedQuanHuyen || !this.selectedQuanHuyen.length) {
      this.notificationService.showError('Vui lòng chọn huyện.');
      return false;
    }

    if (!this.selectedPhuongXa || !this.selectedPhuongXa.length) {
      this.notificationService.showError('Vui lòng chọn xã.');
      return false;
    }

    // Kiểm tra địa chỉ chi tiết
    if (this.diaChiKhachHang.diaChiChiTiet.trim().length <= 0) {
      this.notificationService.showError('Địa chỉ chi tiết không được để trống.');
      return false;
    }

    if (this.diaChiKhachHang.diaChiChiTiet.trim().length < 6 || this.diaChiKhachHang.diaChiChiTiet.trim().length > 255) {
      this.notificationService.showError('Địa chỉ chi tiết phải lớn hơn 6 và nhỏ hơn 255 ký tự.');
      return false;
    }

    if (!specialCharPattern.test(this.diaChiKhachHang.diaChiChiTiet)) {
      this.notificationService.showError('Địa chỉ chi tiết không được chứa ký tự đặc biệt.');
      return false;
    }

    return true;
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

  fetchDataTinhThanhs() {
    this.GHNService.getTinhThanhs().subscribe({
      next: (response: any) => {
        this.tinhThanh = response.data;
      }
    });
  }

  /** Lấy danh sách huyện khi người dùng chọn tỉnh thành */
  onTinhThanhSelect() {
    this.bodyParamsOfQuanHuyen.province_id = parseInt(this.selectedTinhThanh[0].ProvinceID);
    this.GHNService.getQuanHuyen(this.bodyParamsOfQuanHuyen).subscribe({
      next: (response: any) => {
        this.quanHuyen = response.data;
        this.phuongXa = []; // Xóa xã khi thay đổi huyện
        this.selectedQuanHuyen = null;
      }
    });
  }

  /** Lấy danh sách xã khi người dùng chọn huyện */
  onQuanHuyenSelect() {
    this.bodyParamsOfPhuongXa.district_id = this.selectedQuanHuyen[0].DistrictID;
    this.GHNService.getPhuongXa(this.bodyParamsOfPhuongXa).subscribe({
      next: (response: any) => {
        this.phuongXa = response.data;
        this.selectedPhuongXa = null;
      }
    });

    console.log(this.selectedTinhThanh);

  }

  onTinhThanh() {
    this.bodyParamsOfQuanHuyen.province_id = parseInt(this.selectedTinhThanh[0].ProvinceID);
    this.GHNService.getQuanHuyen(this.bodyParamsOfQuanHuyen).subscribe({
      next: (response: any) => {
        this.quanHuyen = response.data;
      }
    });
  }

  /** Lấy danh sách xã khi người dùng chọn huyện */
  onQuanHuyen() {
    this.bodyParamsOfPhuongXa.district_id = this.selectedQuanHuyen[0].DistrictID;
    this.GHNService.getPhuongXa(this.bodyParamsOfPhuongXa).subscribe({
      next: (response: any) => {
        this.phuongXa = response.data;
      }
    });
  }

  /** Lưu trữ xã đã chọn */
  onPhuongXaSelect(event: any) {

  }

  /** Closemodal để đóng modal */
  closeModal(idBtn: string) {
    const closeModalUpdate = document.getElementById(idBtn);
    if (closeModalUpdate) {
      closeModalUpdate.click();
    }
  }

  /**Thêm địa chỉ mới cho khách hàng */
  addNewAddress() {
    if (this.validateAddress()) {
      this.diaChiKhachHang.tenTinh = this.selectedTinhThanh[0]?.ProvinceName;
      this.diaChiKhachHang.tenQuanHuyen = this.selectedQuanHuyen[0]?.DistrictName;
      this.diaChiKhachHang.tenPhuongXa = this.selectedPhuongXa[0]?.WardName;
      this.diaChiKhachHang.idTinh = this.selectedTinhThanh[0]?.ProvinceID;
      this.diaChiKhachHang.idQuanHuyen = this.selectedQuanHuyen[0]?.DistrictID;
      this.diaChiKhachHang.maPhuongXa = this.selectedPhuongXa[0]?.WardCode;
      this.khachHangService.addDCKHByIdKH(this.selectedCustomer.idKhachHang, this.diaChiKhachHang).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess(response.message);
          this.fetchCustomerById(this.selectedCustomer.idKhachHang);
          this.resetForm();
          this.closeModal('closeModalAddDCKH')
          console.log(response);
        },
        error: (err: any) => {
          console.error('Lỗi khi sửa khách hàng: ', err);
          this.notificationService.showError(err.error.message);
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
    this.fetchDataTinhThanhs();
  }
}
