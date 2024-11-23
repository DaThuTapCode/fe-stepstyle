import { Component, OnInit } from '@angular/core';
import { HomeUserService } from '../../service/home-user.service';
import { HoaDonResponse } from '../../../../models/hoa-don/response/hoa-don-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusHD } from '../../../../shared/status-hd';

@Component({
  selector: 'app-pay-ment-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pay-ment-history.component.html',
  styleUrl: './pay-ment-history.component.scss'
})
export class PayMentHistoryComponent implements OnInit {

  /**Danh sach lich su giao dich */
  listLichSuGiaoDich: HoaDonResponse[] = [];


  constructor( private homeUserService: HomeUserService) {}

  fetchLichSuGiaoDich() {
    this.homeUserService.getLichSuGiaoDich().subscribe({
      next: (response: any)  => { 
        this.listLichSuGiaoDich = response.data;
        console.log('Lich ', this.listLichSuGiaoDich)
      } 
    })
  }

  getInvoiceStatusWithClass(status: string): { label: string; cssClass: string } {
    switch (status) {
      case StatusHD.PENDING:
        return { label: 'Đang chờ thanh toán', cssClass: 'text-warning' };
      case StatusHD.PENDINGPROCESSING:
        return { label: 'Đang chờ xác nhận', cssClass: 'text-info' };
      case StatusHD.CONFIRMED:
        return { label: 'Đã xác nhận', cssClass: 'text-primary' };
      case StatusHD.SHIPPING:
        return { label: 'Đang vận chuyển', cssClass: 'text-secondary' };
      case StatusHD.DELIVERED:
        return { label: 'Đã vận chuyển', cssClass: 'text-success' };
      case StatusHD.PAID:
        return { label: 'Đã thanh toán', cssClass: 'text-success' };
      case StatusHD.CANCELLED:
        return { label: 'Đã hủy', cssClass: 'text-danger' };
      default:
        return { label: 'Không xác định', cssClass: 'text-muted' };
    }
  }
  

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
            return 'Đã vận chuyển';
          case StatusHD.PAID:
            return 'Đã thanh toán';
          case StatusHD.CANCELLED:
            return 'Đã hủy';
          default:
            return 'Không xác định';
        }
      }
  ngOnInit(): void {
    this.fetchLichSuGiaoDich();
  }


}
