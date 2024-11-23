import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../../services/invoice.service';
import { HoaDonResponse } from "../../../../../../models/hoa-don/response/hoa-don-response";
import { ActivatedRoute } from "@angular/router";
import { InvoiceDetailService } from '../../../services/invoice-detail.service';
import { InvoiceHistoryService } from '../../../services/invoice-history.service';
import { NotificationService } from '../../../../../../shared/notification.service';
import { StatusHDCT } from '../../../../../../shared/status-hdct';
import { StatusPTTT } from '../../../../../../shared/status-pttt';
import { StatusHD } from '../../../../../../shared/status-hd';
import { LoaiHoaDon } from '../../../../../../shared/loaihoadon';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit {


  orderStatus = 3; // Đơn hàng đang ở trạng thái "Chờ giao hàng".


  /** Biến hứng dữ liệu */
  hoaDon: HoaDonResponse = new HoaDonResponse();


  /** Hàm khởi động chạy các phụ thuộc Dependencies Injection */
  constructor(
    private invoiceService: InvoiceService,
    private invoiceDetailService: InvoiceDetailService,
    private invoiceHistoryService: InvoiceHistoryService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
  ) {
  }

  /** Hàm bắt dữ liệu trạng thái của hóa đơn */
  getInvoiceStatus(status: string): string {
    switch (status) {
      case StatusHD.PENDING:
        return 'Đang chờ thanh toán';
      case StatusHD.PENDINGPROCESSING:
        return 'Đang chờ xác nhận';
      case StatusHD.CONFIRMED:
        return 'Đã xác nhận';
      case StatusHD.SHIPPING:
        return 'Đang vận chuyển';
      case StatusHD.DELIVERED:
        return 'Đã giao hàng';
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
        this.hoaDon = response.data;
        console.log('HoaDons', this.hoaDon);
      },
      error: (err:any) => {
        console.error('Lỗi thi lấy Id Hóa Đơn', err);        
      }
    })
  }

  /** Bắt sự kiện thai đổi trạng thái hóa đơn */
handleChangeInvoiceStatus(trangThaiMoi: StatusHD) {
  let check = confirm ('Xác nhận đổi trạng thái hóa đơn');
  if(!check){
    return;
  }
  this.invoiceService.callApiChangeStatusInvoice(this.hoaDon.idHoaDon, trangThaiMoi).subscribe({
    next: (response: any) => {
       this.notificationService.showSuccess(response.message);
       this.fetchDataHoaDonById(this.hoaDon.idHoaDon);
    },
    error: (error: any) => {
      this.notificationService.showError(error.error.message);
    }
  });

}

  /** Hàm set time line cho hóa đơn */
  setTimeLineByStatus(trangThai: StatusHD) {
    if(trangThai === StatusHD.PENDINGPROCESSING) {
      return 1;
    }else if(trangThai === StatusHD.CONFIRMED) {
      return 2;
    }else if(trangThai === StatusHD.SHIPPING) {
      return 3;
    }else if(trangThai === StatusHD.DELIVERED) {
      return 4;
    }else if (trangThai === StatusHD.PAID) {
      return 5;
    }
    return 0;
  }

  /** Hàm trả ra trạng thái hóa đơn */
  getStatus() {
    return StatusHD;
  }
  /** Hàm trả ra loại hóa đơn */
  getLoaiHoaDon() {
    return LoaiHoaDon;
  }


  /** Bắt sự kiện hủy hóa đơn */
  handleCancelInvoice() {
   let check: boolean = confirm('Bạn có muốn hủy hóa đơn này!')

   alert('Chưa phát triển chức năng này =))))))))))')
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
