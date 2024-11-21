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
  ngOnInit(): void {
    this.fetchLichSuGiaoDich();
  }


}
