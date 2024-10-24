import { Component, OnInit } from '@angular/core';
import { convertToParamMap, Router } from '@angular/router';
import { PhieuGiamGiaRequest } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-request';
import { CouponsService } from '../../../services/coupons.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateUtilsService } from '../../../../../../shared/helper/date-utils.service';


@Component({
  selector: 'app-coupons-create',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coupons-create.component.html',
  styleUrl: './coupons-create.component.scss'
})
export class CouponsCreateComponent implements OnInit {

  /** Biến để thêm phiếu giảm giá */
  newCoupons: PhieuGiamGiaRequest = {
    idPhieuGiamGia: 0,
    maPhieuGiamGia: '',
    tenPhieuGiamGia: '',
    moTa: '',
    loaiGiam: '',
    ngayBatDau: null,
    ngayKetThuc: null,
    giaTriGiamToiDa: 0,
    giaTriGiamToiThieu: 0,
    giaTriGiam: 0,
    trangThai: 'ACTIVE'
  }

  maPhieuGiamGiaExists: boolean = false;

  // Trạng thái lỗi ngày bắt đầu > ngày kết thúc
  isDateInvalid: boolean = false;

  constructor(
    private couPonsService: CouponsService,
    private router: Router,
    private dateUtilsService: DateUtilsService
  ) { }

  /** Hàm quay lại danh sách phiếu giảm giá */
  handleBackToListCoupons() {
    this.router.navigate([`/admin/coupons`])
  }

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {
    /** Kiểm tra các trường không có ký tự đặc biệt và không được chứa khoảng trống */
    /** Ký tự đặc biệt */
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u;
    const maPhieuGiamGia = /^[a-zA-Z0-9]+$/u;

    // Kiểm tra mã phiếu giảm giá
    if (!maPhieuGiamGia.test(this.newCoupons.maPhieuGiamGia)) {
      alert('Mã phiếu giảm giá không được để trống và không được chứa ký tự đặc biệt! Vui lòng nhập lại.');
      return false;
    }

    // Kiểm tra tên phiếu giảm giá
    if (this.newCoupons.tenPhieuGiamGia.trim().length <= 0) {
      alert('Tên phiếu giảm giá không được để trống');
      return false;
    }

    if (!specialCharPattern.test(this.newCoupons.tenPhieuGiamGia)) {
      alert('Tên phiếu giảm giá không được chứ ký tự đặc biệt!');
      return false;
    }

    // Kiểm tra giá trị giảm tối đa
    if (isNaN(Number(this.newCoupons.giaTriGiamToiDa)) || this.newCoupons.giaTriGiamToiDa <= 0) {
      alert('Giá trị giảm tối đa không hợp lệ. Vui lòng nhập lại!');
      return false;
    }

    // Kiểm tra giá trị giảm tối thiểu
    if (isNaN(Number(this.newCoupons.giaTriGiamToiThieu)) || this.newCoupons.giaTriGiamToiThieu <= 0) {
      alert('Giá trị giảm tối thiểu không hợp lệ. Vui lòng nhập lại!');
      return false;
    }

    // Kiểm tra giá trị giảm
    if (isNaN(Number(this.newCoupons.giaTriGiam)) || this.newCoupons.giaTriGiam <= 0) {
      alert('Giá trị giảm không hợp lệ. Vui lòng nhập lại!');
      return false;
    };

    // Validate ngày bắt đầu và ngày kết thúc
    if (!this.newCoupons.ngayBatDau || !this.newCoupons.ngayKetThuc) {
      alert('Ngày bắt đầu và ngày kết thúc không được để trống!');
      return false;
    }

    const startDate = new Date(this.newCoupons.ngayBatDau);
    const endDate = new Date(this.newCoupons.ngayKetThuc);
    
    // Validate ngày bắt đầu phải nhỏ hơn ngày hết thúc
    if (startDate > endDate) {
      this.isDateInvalid = true;
      alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc!');
      return false;
    } else {
      this.isDateInvalid = false;
    }

    // Tất cả các trường hợp lệ
    return true;
  }

  /** Hàm thêm phiếu giảm giá mới */
  submitAdd() {
    if (this.validateFields()) {
      this.couPonsService.postCoupons(this.newCoupons).subscribe({
        next: (response: any) => {
          this.router.navigate([`admin/coupons`]);
        },
        error: (err: any) => {
          console.error('Lỗi khi thêm phiếu giảm giá: ', err);
        }
      });
    }
  }
  ngOnInit(): void {
    /** Khởi tạo lại phiếu giảm giá nếu cần */
    this.newCoupons = new PhieuGiamGiaRequest();
  }

}
