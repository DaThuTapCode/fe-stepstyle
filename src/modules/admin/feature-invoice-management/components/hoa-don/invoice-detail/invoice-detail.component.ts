import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../../services/invoice.service';
import { HoaDonResponse } from "../../../../../../models/hoa-don/response/hoa-don-response";
import { HoaDonChiTietResponse } from "../../../../../../models/hoa-don-chi-tiet/response/hoa-don-chi-tiet-response";
import { LichSuHoaDonResponse } from "../../../../../../models/lich-su-hoa-don/response/lich-su-hoa-don-response";
import { ThanhToanResponse } from "../../../../../../models/thanh-toan/response/thanh-toan-response";
import { PhieuGiamGiaResponse } from "../../../../../../models/phieu-giam-gia/response/phieu-giam-gia-response";
import { ActivatedRoute } from "@angular/router";
import { InvoiceDetailService } from '../../../services/invoice-detail.service';
import { KhachHangResponse } from '../../../../../../models/khach-hang/response/khach-hang-response';
import { NhanVienResponse } from '../../../../../../models/nhan-vien/response/nhan-vien-response';
import { InvoiceHistoryService } from '../../../services/invoice-history.service';
import { NotificationService } from '../../../../../../shared/notification.service';

export enum StatusHD {
  TOTAL = 'TOTAL',
  PENDING = 'PENDING',
  PENDINGPROCESSING = 'PENDINGPROCESSING',
  SHIPPING = 'SHIPPING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED'
}

export enum StatusHDCT {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum StatusEnum {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export enum StatusPTTT {
  CASH = 'CASH',
  COD = 'COD',
  VNPAY = 'VNPAY',
}


@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit {

  /** Biến hứng dữ liệu */
  hoaDon: HoaDonResponse = new HoaDonResponse();


  /** Hàm khởi động chạy các phụ thuộc Dependencies Injection */
  constructor(
    private invoiceService: InvoiceService,
    private invoiceDetailService: InvoiceDetailService,
    private invoiceHistoryService: InvoiceHistoryService,
    private route: ActivatedRoute,
    private notificationService: NotificationService

  ) {
  }

  /** Hàm bắt dữ liệu trạng thái của hóa đơn */
  getInvoiceStatus(status: string): string {
    switch (status) {
      case StatusHD.PENDING:
        return 'Đang chờ thanh toán';
      case StatusHD.PENDINGPROCESSING:
        return 'Đang chờ xử lý';
      case StatusHD.SHIPPING:
        return 'Đang vận chuyển';
      case StatusHD.PAID:
        return 'Đã thanh toán';
      case StatusHD.CANCELLED:
        return 'Đã hủy';
      default:
        return 'Không xác định';
    }
  }

  /** Hàm bắt dữ liệu trạng thái của hóa đơn chi tiết */
  getInvoiceDetailStatus(status: string): string {
    switch (status) {
      case StatusHDCT.ACTIVE:
        return 'Đang hoạt động';
      case StatusHDCT.INACTIVE:
        return 'Ngừng hoạt động';
      default:
        return 'Không xác định';
    }
  }

  /** Hàm bắt dữ liệu trạng thái của lịch sủ hóa đơn */
  getInvoiceHistoryStatus(status: string): string {
    switch (status) {
      case StatusHDCT.ACTIVE:
        return 'Đang hoạt động';
      case StatusHDCT.INACTIVE:
        return 'Ngừng hoạt động';
      default:
        return 'Không xác định';
    }
  }

  /** Hàm bắt dữ liệu trạng thái của lịch sủ hóa đơn */
  getInvoicePaymentStatus(status: string): string {
    switch (status) {
      case StatusPTTT.CASH:
        return 'Tiền mặt';
      case StatusPTTT.COD:
        return 'Giao hàng tại nhà';
      case StatusPTTT.VNPAY:
        return 'Chuyển khoản';
      default:
        return 'Không xác định';
    }
  }


  /** Hàm tải dữ liệu cho hóa đơn */
  fetchDataHoaDonById(
    idHoaDon: number
  ) {
    this.invoiceService.getInvoiceById(idHoaDon).subscribe({
      next: (response: any) => {
        this.notificationService.showSuccess(response.message);
        this.hoaDon = response.data;
        console.log('HoaDons', this.hoaDon);
      },
      error: (err:any) => {
        this.notificationService.showError(err.error.message);
        console.error('Lỗi thi lấy Id Hóa Đơn', err);
        
      }
    })
  }

  /** Hàm chạy khởi tạo các dữ liệu */
  ngOnInit(): void {
    /**Lấy id Hóa đơn từ đương dẫn */
    this.route.paramMap.subscribe(params => {
      const idHoaDon = Number(params.get('id'));
      if (idHoaDon) {
        this.fetchDataHoaDonById(idHoaDon);  // Lấy dữ liệu khách hàng
      }
    });
  }


}
