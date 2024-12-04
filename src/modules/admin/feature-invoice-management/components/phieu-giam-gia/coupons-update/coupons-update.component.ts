import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PhieuGiamGiaRequest } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-request';
import { CouponsService } from '../../../services/coupons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { error } from 'jquery';
import { DateUtilsService } from '../../../../../../shared/helper/date-utils.service';
import { NotificationService } from '../../../../../../shared/notification.service';
import { StatusPGG } from '../../../../../../shared/status-pgg';
import { StatusLoaiGiam } from '../../../../../../shared/status-loaigiam';


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

  minDate: any;

  /** Biến hứng dữ liệu để chỉnh sửa */
  selectedCoupons: PhieuGiamGiaRequest = {
    idPhieuGiamGia: 0,
    maPhieuGiamGia: '',
    tenPhieuGiamGia: '',
    moTa: '',
    loaiGiam: StatusLoaiGiam.MONEY  ,
    giaTriGiamToiDa: 0,
    giaTriHoaDonToiThieu: 0,
    giaTriGiam: 0,
    trangThai: StatusPGG.ACTIVE
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
        
        // Kiểm tra disable các ngày trước ngày hiện tại đối với trạng thái Sắp diễn ra
        if (this.selectedCoupons.trangThai === StatusPGG.COMINGSOON) {
          this.minDate = new Date().toISOString().split('T')[0];;
          this.isStartDateEditable = true;
        }

        // Kiểm tra trạng thái để cho phép chỉnh sửa ngày bắt đầu
        this.isStartDateEditable = this.selectedCoupons.trangThai === StatusPGG.COMINGSOON;
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy phiếu giảm giá theo idPhieuGiamGia: ', err);
      }
    })
  }

  /** Phương thức xử lý khi thay đổi loại giảm giá */
  onDiscountTypeChange() {
    if (this.selectedCoupons.loaiGiam === 'PERCENT') {
      this.selectedCoupons.giaTriGiamToiDa = 100;
    } else if (this.selectedCoupons.loaiGiam === 'MONEY') {
      this.selectedCoupons.giaTriGiamToiDa = 0;
    }
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
    // Kiểm tra các trường không có ký tự đặt biệt
    const specialCharPattern = /^[\p{L}\p{N}\s]+$/u;

    // Kiểm tra tên phiếu giảm giá
    if (this.selectedCoupons.tenPhieuGiamGia.trim().length <= 0) {
      return false;
    }

    if (!specialCharPattern.test(this.selectedCoupons.tenPhieuGiamGia)) {
      return false;
    }
    
    // Kiểm tra phiếu giảm giá theo loại giảm
    if (this.selectedCoupons.loaiGiam === 'PERCENT') {
      if (this.selectedCoupons.giaTriGiam <= 0 || this.selectedCoupons.giaTriGiam > 100) {
        return false;
      }
    } else if (this.selectedCoupons.loaiGiam === 'MONEY') {
      if (this.selectedCoupons.giaTriGiam <= 0) {
        return false;
      }
    }

    // Kiểm tra giá trị giảm tối đa
    if (this.selectedCoupons.loaiGiam === 'PERCENT') {
      if (isNaN(Number(this.selectedCoupons.giaTriGiamToiDa)) || this.selectedCoupons.giaTriGiamToiDa <= 0) {
        return false;
      }
    } 
    // Kiểm tra giá trị giảm tối thiểu
    if (isNaN(Number(this.selectedCoupons.giaTriHoaDonToiThieu)) || this.selectedCoupons.giaTriHoaDonToiThieu <= 0) {
      return false;
    }

    // Kiểm tra giá trị giảm
    if (isNaN(Number(this.selectedCoupons.giaTriGiam)) || this.selectedCoupons.giaTriGiam <= 0) {
      return false;
    };

    const startDate = new Date(this.selectedCoupons.ngayBatDau);
  const endDate = new Date(this.selectedCoupons.ngayKetThuc);
  const today = new Date(this.getTodayDate());

  // Validate ngày bắt đầu phải nhỏ hơn ngày hết thúc
  if (startDate >= endDate) {
    this.isDateInvalid = true;
    this.notificationService.showError('Ngày bắt đầu nhỏ hơn ngày kết thúc. Vui lòng nhập lại!')
    return false;
  } else {
    this.isDateInvalid = false;
  }

    
    // Tất cả các trường hợp lệ
    return true;

  }

  /**Hàm cập nhật trạng thái ACTIVE là ngày hiện tại */
  onStartDateChange() {
    const currentDate = this.dateUtilsService.getCurrentDateFormatted();
    const startDate = this.dateUtilsService.convertToBackendFormat(this.selectedCoupons.ngayBatDau);
  
    if (startDate === currentDate && this.selectedCoupons.trangThai === StatusPGG.COMINGSOON) {
      this.selectedCoupons.trangThai = StatusPGG.ACTIVE;
    }
  }

  /** Hàm để gọi Update */
  submitUpdate() {
    if (this.validateFields()) {
      // Hiển thị "dd-MM-yyyy"
      this.selectedCoupons.ngayBatDau = this.dateUtilsService.convertToBackendFormat(this.selectedCoupons.ngayBatDau);
      this.selectedCoupons.ngayKetThuc = this.dateUtilsService.convertToBackendFormat(this.selectedCoupons.ngayKetThuc);
      this.couPonsService.putCoupons(this.selectedCoupons.idPhieuGiamGia, this.selectedCoupons).subscribe({
        next: (response: any) => {     
          this.notificationService.showSuccess(response.message);
          this.router.navigate([`/admin/coupons`]);
        },
        error: (err: any) => {
          this.notificationService.showError(err.error.message);
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
