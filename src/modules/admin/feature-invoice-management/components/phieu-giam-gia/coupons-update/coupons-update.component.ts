import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhieuGiamGiaRequest } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-request';
import { CouponsService } from '../../../services/coupons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { DateUtilsService } from '../../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../../shared/notification.service';

export enum StatusPGG {
  ACTIVE = 'ACTIVE',
  COMINGSOON = 'COMINGSOON',
  USED = 'USED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED'
}

@Component({
  selector: 'app-coupons-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './coupons-update.component.html',
  styleUrl: './coupons-update.component.scss'
})
export class CouponsUpdateComponent implements OnInit {

  // Trạng thái lỗi ngày bắt đầu > ngày kết thúc
  isDateInvalid: boolean = false;

  // Xác định xem có cho phép chỉnh sửa ngày bắt đầu hay không
  isStartDateEditable: boolean = false;

  minDate: string = '';

  /** Biến hứng dữ liệu để chỉnh sửa */
  selectedCoupons: PhieuGiamGiaRequest = {
    idPhieuGiamGia: 0,
    maPhieuGiamGia: '',
    tenPhieuGiamGia: '',
    moTa: '',
    loaiGiam: '',
    giaTriGiamToiDa: 0,
    giaTriGiamToiThieu: 0,
    giaTriGiam: 0,
    trangThai: ''
  }

  /** Hàm khởi chạy các phụ thuộc */
  constructor(
    private couPonsService: CouponsService,
    private route: ActivatedRoute,
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
    this.router.navigate([`/admin/coupons`]);
  }

  /** hàm tải dữ liệu phiếu giảm giá theo idPhieuGiamGia  */
  fetchDataCouponsById(
    idPhieuGiamGia: number
  ) {
    this.couPonsService.getCouponsById(idPhieuGiamGia).subscribe({
      next: (response: any) => {
        this.selectedCoupons = response.data;
        this.selectedCoupons.ngayBatDau = this.dateUtilsService.convertToISOFormat(this.selectedCoupons.ngayBatDau);
        this.selectedCoupons.ngayKetThuc = this.dateUtilsService.convertToISOFormat(this.selectedCoupons.ngayKetThuc);
        if (this.selectedCoupons.trangThai === StatusPGG.COMINGSOON) {
          this.minDate = this.selectedCoupons.ngayBatDau;
        }
        // Kiểm tra trạng thái để cho phép chỉnh sửa ngày bắt đầu
        this.isStartDateEditable = this.selectedCoupons.trangThai === StatusPGG.COMINGSOON;
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy phiếu giảm giá theo idPhieuGiamGia: ', err);
      }
    })
  }

  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {
    // Kiểm tra các trường không có ký tự đặt biệt
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u;

    // Kiểm tra tên phiếu giảm giá
    if (this.selectedCoupons.tenPhieuGiamGia.trim().length <= 0) {
      return false;
    }

    if (!specialCharPattern.test(this.selectedCoupons.tenPhieuGiamGia)) {
      return false;
    }

    // Kiểm tra giá trị giảm tối đa
    if (isNaN(Number(this.selectedCoupons.giaTriGiamToiDa)) || this.selectedCoupons.giaTriGiamToiDa <= 0) {
      return false;
    }

    // Kiểm tra giá trị giảm tối thiểu
    if (isNaN(Number(this.selectedCoupons.giaTriGiamToiThieu)) || this.selectedCoupons.giaTriGiamToiThieu <= 0) {
      return false;
    }

    // Kiểm tra giá trị giảm
    if (isNaN(Number(this.selectedCoupons.giaTriGiam)) || this.selectedCoupons.giaTriGiam <= 0) {
      return false;
    };

    // Kiểm tra ngày kết thúc phải lớn hơn ngày bắt đầu
    if (this.selectedCoupons.trangThai === StatusPGG.COMINGSOON || StatusPGG.ACTIVE) {
      const startDate = new Date(this.dateUtilsService.convertToISOFormat(this.selectedCoupons.ngayBatDau));
      const endDate = new Date(this.dateUtilsService.convertToISOFormat(this.selectedCoupons.ngayKetThuc));

      if (endDate <= startDate) {
        this.notificationService.showError("Ngày kết thúc phải lớn hơn ngày bắt đầu khi phiếu giảm giá");
        return false;
      }
    }

    // Tất cả các trường hợp lệ
    return true;

  }

  /** Hàm để gọi Update */
  submitUpdate() {
    if (this.validateFields()) {
      // Hiển thị "dd-MM-yyyy"
      this.selectedCoupons.ngayBatDau = this.dateUtilsService.convertToBackendFormat(this.selectedCoupons.ngayBatDau);
      this.selectedCoupons.ngayKetThuc = this.dateUtilsService.convertToBackendFormat(this.selectedCoupons.ngayKetThuc);

      // Kiểm tra nếu ngày bắt đầu là ngày hiện tại => cập nhật phiếu giảm giá = ACTIVE
      const currentDate = this.dateUtilsService.getCurrentDateFormatted();
      if (this.selectedCoupons.ngayBatDau === currentDate && this.selectedCoupons.trangThai === StatusPGG.COMINGSOON) {
        this.selectedCoupons.trangThai = StatusPGG.ACTIVE;
      }
      this.couPonsService.putCoupons(this.selectedCoupons.idPhieuGiamGia, this.selectedCoupons).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess(response.message);
          this.router.navigate([`/admin/coupons`]);
        },
        error: (err: any) => {
          console.error('Lỗi khi cập nhật phiếu giảm giá', err);
          this.notificationService.showError(err.message);
        }
      });
    }
  }

  /** Hàm chạy khởi tạo các dữ liệu */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idPhieuGiamGia = Number(params.get('id'));
      if (idPhieuGiamGia) {
        this.fetchDataCouponsById(idPhieuGiamGia);  // Lấy dữ liệu phiếu giảm giá
      }
    });
  }

}
