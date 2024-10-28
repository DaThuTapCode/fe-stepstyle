import { Component, OnInit } from '@angular/core';
import { convertToParamMap, Router } from '@angular/router';
import { PhieuGiamGiaRequest } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-request';
import { CouponsService } from '../../../services/coupons.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateUtilsService } from '../../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../../shared/notification.service';


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
    trangThai: ''
  }

  maPhieuGiamGiaExists: boolean = false;

  // Trạng thái lỗi ngày bắt đầu > ngày kết thúc
  isDateInvalid: boolean = false;

  constructor(
    private couPonsService: CouponsService,
    private router: Router,
    private dateUtilsService: DateUtilsService,
    private notificationService: NotificationService
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

    // Kiểm tra tên phiếu giảm giá
    if (this.newCoupons.tenPhieuGiamGia.trim().length <= 0) {
      return false;
    }

    if (!specialCharPattern.test(this.newCoupons.tenPhieuGiamGia)) {
      return false;
    }

    // Kiểm tra giá trị giảm tối đa
    if (isNaN(Number(this.newCoupons.giaTriGiamToiDa)) || this.newCoupons.giaTriGiamToiDa <= 0) {
      return false;
    }

    // Kiểm tra giá trị giảm tối thiểu
    if (isNaN(Number(this.newCoupons.giaTriGiamToiThieu)) || this.newCoupons.giaTriGiamToiThieu <= 0) {
      return false;
    }

    // Kiểm tra giá trị giảm
    if (isNaN(Number(this.newCoupons.giaTriGiam)) || this.newCoupons.giaTriGiam <= 0) {
      return false;
    };

    // Validate ngày bắt đầu và ngày kết thúc
    if (!this.newCoupons.ngayBatDau || !this.newCoupons.ngayKetThuc) {
      return false;
    }

    const startDate = new Date(this.newCoupons.ngayBatDau);
    const endDate = new Date(this.newCoupons.ngayKetThuc);

    // Validate ngày bắt đầu phải nhỏ hơn ngày hết thúc
    if (startDate > endDate) {
      this.isDateInvalid = true;
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
      // Hiển thị "dd-MM-yyyy"
      this.newCoupons.ngayBatDau = this.dateUtilsService.convertToBackendFormat(this.newCoupons.ngayBatDau);
      this.newCoupons.ngayKetThuc = this.dateUtilsService.convertToBackendFormat(this.newCoupons.ngayKetThuc);
      
      this.couPonsService.postCoupons(this.newCoupons).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess(response.message);
          this.router.navigate([`/admin/coupons`]);    
        },
        error: (err: any) => {
          this.notificationService.showError(err.message);
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
