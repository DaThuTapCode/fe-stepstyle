import { Component, OnInit } from '@angular/core';
import { convertToParamMap, Router } from '@angular/router';
import { PhieuGiamGiaRequest } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-request';
import { CouponsService } from '../../../services/coupons.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateUtilsService } from '../../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../../shared/notification.service';

export enum StatusPGG {
  ACTIVE = 'ACTIVE', /** Đang hoạt động */
  COMINGSOON = 'COMINGSOON', /** Sắp diễn ra */
  USED = 'USED',     /** Đã được sử dụng */
  EXPIRED = 'EXPIRED',    /** Đã kết thúc */
  CANCELLED = 'CANCELLED'   /** Đã bị hủy */
}

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

  /** Hàm bắt dữ liệu trạng thái của phiếu giảm giá */
  getCouponsStatusPGG(status: string): string {
    switch (status) {
      case StatusPGG.ACTIVE:
        return 'Đang hoạt động';
      case StatusPGG.COMINGSOON:
        return 'Sắp diễn ra';
      case StatusPGG.USED:
        return 'Đã được sử dụng';
      case StatusPGG.EXPIRED:
        return 'Đã kết thúc';
      case StatusPGG.CANCELLED:
        return 'Đã bị hủy';
      default:
        return 'Không xác định';
    }
  }

  /** Hàm quay lại danh sách phiếu giảm giá */
  handleBackToListCoupons() {
    this.router.navigate([`/admin/coupons`])
  }

  /**
 * Hàm lấy ngày hiện tại theo định dạng yyyy-MM-dd
 * @returns Chuỗi ngày hiện tại theo định dạng yyyy-MM-dd
 */
  getTodayDate(): string {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`; // Định dạng yyyy-MM-dd cho `min`
  }

  /**
   * Hàm định dạng ngày thành dd-MM-yyyy để hiển thị
   * @param dateString Chuỗi ngày theo định dạng yyyy-MM-dd
   * @returns Chuỗi ngày theo định dạng dd-MM-yyyy
   */
  formatDateForDisplay(dateString: string): string {
    const [year, month, day] = dateString.split("-");
    return `${day}-${month}-${year}`;
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
    const today = new Date(this.getTodayDate());

    // Validate ngày bắt đầu phải nhỏ hơn ngày hết thúc
    if (startDate > endDate) {
      this.isDateInvalid = true;
      return false;
    } else {
      this.isDateInvalid = false;
    }

    // Đặt trạng thái tự động theo ngày bắt đầu
    if (startDate > today) {
      this.newCoupons.trangThai = StatusPGG.COMINGSOON;
    } else if (startDate.toDateString() === today.toDateString()) {
      this.newCoupons.trangThai = StatusPGG.ACTIVE;
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
