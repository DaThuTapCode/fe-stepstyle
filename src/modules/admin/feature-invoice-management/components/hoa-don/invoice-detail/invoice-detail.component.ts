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

export enum StatusHD {
  PENDING = 'PENDING',
  PAID = 'PAID',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  OVERDUE = 'OVERDUE'
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
    private route: ActivatedRoute
    
  ) {
  }

  /** Hàm bắt dữ liệu trạng thái */
  getInvoiceStatus(status: string): string {
    switch (status) {
      case StatusHD.PENDING:
        return 'Đang chờ';
      case StatusHD.PAID:
        return 'Đã thanh toán';
      case StatusHD.CANCELLED:
        return 'Đã hủy';
      case StatusHD.REFUNDED:
        return 'Đã hoàn tiền';
      case StatusHD.OVERDUE:
        return 'Quá hạn';
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
        this.hoaDon = response.data;
        console.log('HoaDons', this.hoaDon);       
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
