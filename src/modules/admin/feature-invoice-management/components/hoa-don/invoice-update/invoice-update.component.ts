import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../../services/invoice.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HoaDonRequest } from '../../../../../../models/hoa-don/request/hoa-don-request';
import { NotificationService } from '../../../../../../shared/notification.service';
import { StatusHD } from '../../../../../../shared/status-hd';

@Component({
  selector: 'app-invoice-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-update.component.html',
  styleUrl: './invoice-update.component.scss'
})
export class InvoiceUpdateComponent implements OnInit {

  hoaDons: HoaDonRequest[] = [];

  StatusHD = StatusHD;

  /** Biến hứng dữ liệu để chỉnh sửa*/
  selectedInvoice: any = {
    idHoaDon: 0,
    maHoaDon: '',
    phiVanChuyen: 0,
    tongTien: 0,
    tongTienSauGiam: 0,
    loaiHoaDon: '',
    diaChiGiaoHang: '',
    soDienThoaiKhachHang: '',
    ghiChu: '',
    trangThai: '',
  }
  submitted: any;

  /** Hàm khởi động chạy các phụ thuộc Dependencies Injection */
  constructor(
    private inVoiceService: InvoiceService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService
  ) {
  }

  /** Hàm quay lại danh sách hóa đơn */
  handleBackToListInvoice() {
    this.router.navigate([`/admin/invoice`]);
  }

  /** Hàm tải dữ liệu danh sách hóa đơn theo idHoaDon */
  fetchDataHoaDonById(
    idHoaDon: number
  ) {
    this.inVoiceService.getInvoiceById(idHoaDon).subscribe({
      next: (response: any) => {
        this.selectedInvoice = response.data;
        if (this.selectedInvoice.trangThai !== StatusHD.PENDINGPROCESSING && this.selectedInvoice.trangThai !== StatusHD.SHIPPING) {
          this.router.navigate([`/admin/invoice`]);
        }
      },
      error: (err: any) => {
        this.notificationService.showError(err.message);
        console.error('Lỗi khi lấy danh sách hóa đơn: ', err);
      }
    })
  }

  /** Hàm kiểm tra tính hợp lệ của các trường */
  validateFiels(): boolean {

    /** Kiểm tra các trường không có kí tự đặc biệt và khoảng trống */
    const specialCharPattern = /^[\p{L}\p{N}\s,]+$/u;

    // Kiểm tra phí vận chuyển
    if (isNaN(Number(this.selectedInvoice.phiVanChuyen)) || this.selectedInvoice.phiVanChuyen <= 0) {
      this.notificationService.showError('Vui lòng không để trống')
      return false;
    }

    // Kiểm tra tổng tiền sau giảm
    if (isNaN(Number(this.selectedInvoice.tongTienSauGiam)) || this.selectedInvoice.tongTienSauGiam <= 0) {
      this.notificationService.showError('Vui lòng không để trống')
      return false;
    }

    // Kiểm tra loại hóa đơn
    if (!this.selectedInvoice.loaiHoaDon) {
      this.notificationService.showError('Vui lòng không để trống')
      return false;
    }

    // Kiểm tra địa chỉ giao hàng
    if (!specialCharPattern.test(this.selectedInvoice.diaChiGiaoHang.trim())) {
      this.notificationService.showError('Vui lòng không để trống')
      return false;
    }

    // Kiểm tra trạng thái
    if (!this.selectedInvoice.trangThai) {
      this.notificationService.showError('Vui lòng không để trống')
      return false;
    }

    // Nếu mọi thứ hợp lệ
    return true;


  }

  /** Hàm để gọi Update */
  submitUpdate() {
    if (this.validateFiels()) {
      /** Gửi yêu cầu cập nhật đến tất cả các trường */
      this.inVoiceService.putUpdateInvoice(this.selectedInvoice.idHoaDon, this.selectedInvoice).subscribe({
        next: (response: any) => {
          this.notificationService.showSuccess(response.message);
          this.router.navigate([`/admin/invoice`]);
        },
        error: (err: any) => {
          this.notificationService.showError(err.message);
          console.error('Lỗi khi cập nhật hóa đơn', err);
        }
      });
    }
  }

  /** Kiểm tra nếu trạng thái hóa đơn là Đang vận chuyển */
  isShippingStatus(): boolean {
    return this.selectedInvoice.trangThai === StatusHD.SHIPPING;
  }


  /** Hàm chạy khởi tạo các dữ liệu */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idHoaDon = Number(params.get('id'));
      if (idHoaDon) {
        this.fetchDataHoaDonById(idHoaDon);  // Lấy dữ liệu hóa đơn
      }
    });
  }

}
