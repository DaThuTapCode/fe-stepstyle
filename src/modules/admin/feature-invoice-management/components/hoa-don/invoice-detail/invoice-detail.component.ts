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
import { HamDungChung } from '../../../../../../shared/helper/ham-dung-chung';
import { PaymentService } from '../../../../../user/service/payment.service';

@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit {
  xuatHd(): void {
    const idHoaDon = this.hoaDon.idHoaDon;
    this.invoiceService.exportInvoice(idHoaDon).subscribe({
      next: (data: Blob) => {
        const fileName = `HoaDon_${idHoaDon}.pdf`;
  
        // Tạo một URL đối tượng từ Blob
        const url = window.URL.createObjectURL(data);
  
        // Tạo một phần tử <a> để kích hoạt tải xuống
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
  
        // Thêm phần tử vào DOM và kích hoạt tải xuống
        document.body.appendChild(a);
        a.click();
  
        // Xóa phần tử <a> sau khi tải xuống
        document.body.removeChild(a);
  
        // Giải phóng URL đối tượng
        window.URL.revokeObjectURL(url);
      } 
    });
    }
    
    
  


  // orderStatus = 3; // Đơn hàng đang ở trạng thái "Chờ giao hàng".


  /** Biến hứng dữ liệu */
  hoaDon: HoaDonResponse = new HoaDonResponse();


  /** Hàm khởi động chạy các phụ thuộc Dependencies Injection */
  constructor(
    private invoiceService: InvoiceService,
    private invoiceDetailService: InvoiceDetailService,
    private invoiceHistoryService: InvoiceHistoryService,
    private route: ActivatedRoute,
    private notificationService: NotificationService,
    public hamDungChung: HamDungChung,
    public paymentService: PaymentService,
  ) {
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
      error: (err: any) => {
        console.error('Lỗi thi lấy Id Hóa Đơn', err);
      }
    })
  }

  /** Bắt sự kiện thai đổi trạng thái hóa đơn */
  handleChangeInvoiceStatus(trangThaiMoi: StatusHD) {
    let check = confirm('Xác nhận đổi trạng thái hóa đơn');
    if (!check) {
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
    if (trangThai === StatusHD.PENDINGPROCESSING) {
      return 1;
    } else if (trangThai === StatusHD.CONFIRMED) {
      return 2;
    } else if (trangThai === StatusHD.SHIPPING) {
      return 3;
    } else if (trangThai === StatusHD.DELIVERED) {
      return 4;
    } else if (trangThai === StatusHD.PAID) {
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
  lyDoHuy: string = '';
  handleCancelInvoice() {


    if(this.lyDoHuy.trim().length < 6 || this.lyDoHuy.trim().length > 255){
      this.notificationService.showError('Lý do hủy phải lớn hơn 6 và nhỏ hơn 255 ký tự');
      return;
    }

    if (!confirm('Bạn có muốn hủy hóa đơn này!')) {
      return;
    }

    this.paymentService.callApiHuyDonHangPhiaAdmin(this.hoaDon.idHoaDon, this.lyDoHuy).subscribe({
      next: (response: any) => {
        this.fetchDataHoaDonById(this.hoaDon.idHoaDon);
        this.notificationService.showSuccess(response.message);
        this.hamDungChung.closeModal('closeModalHuyDonHang');
      },
      error: (err: any) => {
        this.notificationService.showError(err.error.message);
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
