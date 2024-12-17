import { Component, OnInit } from '@angular/core';
import { convertToParamMap, Router } from '@angular/router';
import { PhieuGiamGiaRequest } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-request';
import { CouponsService } from '../../../services/coupons.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DateUtilsService } from '../../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../../shared/notification.service';
import { StatusPGG } from '../../../../../../shared/status-pgg';
import { StatusLoaiGiam } from '../../../../../../shared/status-loaigiam';



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
    loaiGiam: StatusLoaiGiam.MONEY,
    ngayBatDau: null,
    ngayKetThuc: null,
    giaTriGiamToiDa: 0,
    giaTriHoaDonToiThieu: 0,
    giaTriGiam: 0,
    trangThai: StatusPGG.ACTIVE,
    soLuong: 0
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
    return `${year}-${month}-${day}`;
  }




  /** Hàm kiểm tra tính hợp lệ của các trường nhập */
  validateFields(): boolean {
    /** Kiểm tra các trường không có ký tự đặc biệt và không được chứa khoảng trống */
    /** Ký tự đặc biệt */
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u;

    // Kiểm tra tên phiếu giảm giá
    if (this.newCoupons.tenPhieuGiamGia.trim().length <= 6) {
      this.notificationService.showError('Tên phiếu giảm giá phải lớn hơn 6 ký tự');
      return false;
    }

    // if (!specialCharPattern.test(this.newCoupons.tenPhieuGiamGia)) {
    //   this.notificationService.showError('Tên phiếu giảm giá không được chứa ký tự đặc biệt');
    //   return false;
    // }

    // Kiểm tra số lượng phiếu giảm giá
    if (isNaN(Number(this.newCoupons.soLuong)) || this.newCoupons.soLuong <= 0 || this.newCoupons.soLuong >= 1000) {
      this.notificationService.showError('Số lượng phiếu giảm giá phải lớn hơn 0 và nhỏ hơn 1000');
      return false;
    }

    //Kiểm tra ngày bắt đầu và ngày kết thúc
    const startDate = new Date(this.newCoupons.ngayBatDau);
    const endDate = new Date(this.newCoupons.ngayKetThuc);
    const today = new Date(this.getTodayDate());

    // Validate ngày bắt đầu phải nhỏ hơn ngày hết thúc
    if (startDate >= endDate) {
      this.isDateInvalid = true;
      this.notificationService.showError('Ngày bắt đầu phải nhỏ hơn ngày kết thúc!')
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

    // Kiểm tra giá trị giảm tùy theo loại giảm giá
    if (this.newCoupons.loaiGiam === 'PERCENT') {
      // Với loại giảm theo phần trăm, giá trị giảm phải nằm trong khoảng từ 0 đến 100 và là số nguyên dương
      const giaTriGiam = Number(this.newCoupons.giaTriGiam);
      const giaTriGiamToiDa = Number(this.newCoupons.giaTriGiamToiDa);

      if (
        isNaN(giaTriGiam) ||         // Kiểm tra có phải số hay không
        giaTriGiam <= 0 ||           // Không phải số dương
        !Number.isInteger(giaTriGiam) || // Không phải số nguyên
        giaTriGiam >= 100             // Lớn hơn 100
      ) {
        this.notificationService.showError('Giá trị giảm phải là số nguyên dương và nhỏ hơn 100%');
        return false; // Giá trị không hợp lệ
      }


      if (
        isNaN(giaTriGiamToiDa) ||         // Kiểm tra có phải số hay không
        giaTriGiamToiDa <= 0 ||           // Không phải số dương
        !Number.isInteger(giaTriGiamToiDa)
      ) {
        this.notificationService.showError('Giá trị giảm tối đa phải là số nguyên dương');
        return false; // Giá trị không hợp lệ
      }
      if (giaTriGiamToiDa > 1000000000)
      {
        this.notificationService.showError('Giá trị giảm tối đa phải nhỏ hơn 1.000.000.000 VND');
        return false; // Giá trị không hợp lệ
      }



    }
    else if (this.newCoupons.loaiGiam === 'MONEY') {
      // Với loại giảm theo tiền, giá trị giảm phải lớn hơn 0
      if (isNaN(Number(this.newCoupons.giaTriGiam)) || !Number.isInteger(this.newCoupons.giaTriGiam) || this.newCoupons.giaTriGiam <= 0) {
        this.notificationService.showError('Giá trị giảm phải là số nguyên dương')
        return false;
      }
      if (isNaN(Number(this.newCoupons.giaTriGiam)) || !Number.isInteger(this.newCoupons.giaTriGiam) || this.newCoupons.giaTriGiam > 1000000000) {
        this.notificationService.showError('Giá trị giảm phải nhỏ hơn 1.000.000.000 VND')
        return false;
      }
    }


    // Kiểm tra giá trị đơn hàng tối thiểu
    if (isNaN(Number(this.newCoupons.giaTriHoaDonToiThieu)) || !Number.isInteger(this.newCoupons.giaTriHoaDonToiThieu) || this.newCoupons.giaTriHoaDonToiThieu <= 0) {
      this.notificationService.showError('Giá trị đơn hàng tối thiểu phải là số nguyên dương');
      return false;
    }
    // Kiểm tra giá trị đơn hàng tối thiểu
    if (isNaN(Number(this.newCoupons.giaTriHoaDonToiThieu)) || this.newCoupons.giaTriHoaDonToiThieu > 1000000000) {
      this.notificationService.showError('Giá trị đơn hàng tối thiểu phải nhỏ hơn hoặc bằng 1.000.000.000 VND');
      return false;
    }

    // Kiểm tra giá trị giảm
    if (isNaN(Number(this.newCoupons.giaTriGiam)) || this.newCoupons.giaTriGiam <= 0) {
      this.notificationService.showError('Giá trị giảm phải lớn hơn 0');
      return false;
    };

    return true;
  }

  /** Hàm thêm phiếu giảm giá mới */
  submitAdd() {
    if (this.validateFields()) {
      if (!confirm('Bạn có muốn thêm phiếu giảm giá mới?')) {
        return;
      }
      // Hiển thị "dd-MM-yyyy"
      this.newCoupons.ngayBatDau = this.dateUtilsService.convertToBackendFormat(this.newCoupons.ngayBatDau);
      this.newCoupons.ngayKetThuc = this.dateUtilsService.convertToBackendFormat(this.newCoupons.ngayKetThuc);

      this.couPonsService.postCoupons(this.newCoupons).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess(response.message);
          this.router.navigate([`/admin/coupons`]);
        },
        error: (err: any) => {
          this.notificationService.showError(err.error.message);
          this.newCoupons.ngayBatDau = this.dateUtilsService.convertToISOFormat(this.newCoupons.ngayBatDau);
          this.newCoupons.ngayKetThuc = this.dateUtilsService.convertToISOFormat(this.newCoupons.ngayKetThuc);
        }
      });
    }
  }

  ngOnInit(): void {
    this.newCoupons = new PhieuGiamGiaRequest();
  }

}
