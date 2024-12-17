import { Component, OnInit } from '@angular/core';
import { HomeUserService } from '../../service/home-user.service';
import { HoaDonResponse } from '../../../../models/hoa-don/response/hoa-don-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HamDungChung } from '../../../../shared/helper/ham-dung-chung';
import { StatusHD } from '../../../../shared/status-hd';
import { LoaiHoaDon } from '../../../../shared/loaihoadon';
import { CartService } from '../../service/cart.service';
import { PaymentService } from '../../service/payment.service';
import { NotificationService } from '../../../../shared/notification.service';

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

  /**Hóa đơn đang được chọn */
  hoaDonDangChon: HoaDonResponse = new HoaDonResponse();

  constructor(
    private homeUserService: HomeUserService,
    public hamDungChung: HamDungChung,
    private cartService: CartService,
    private paymentService: PaymentService,
    private notiService: NotificationService,
  ) { }

  fetchLichSuGiaoDich() {
    this.homeUserService.getLichSuGiaoDich().subscribe({
      next: (response: any) => {
        this.listLichSuGiaoDich = response.data;
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    })
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

  handleChonHoaDonCanXem(hd: HoaDonResponse) {
    this.hoaDonDangChon = hd;
  }

  /** Hàm ẩn hiện nút hủy với các điều điện */
  kiemTraNutHuy(hd: HoaDonResponse): boolean {
    if (
      hd.trangThai != StatusHD.CANCELLED &&
      hd.trangThai != StatusHD.SHIPPING &&
      hd.trangThai != StatusHD.DELIVERED &&
      hd.trangThai != StatusHD.PAID &&
      hd.trangThai != StatusHD.CONFIRMED
      && hd.loaiHoaDon != LoaiHoaDon.COUNTERSALES
    ) {
      return true;
    }
    return false;
  }

  /**Biến hứng lý do hủy */
  lyDoHuy: string = '';
  /** Bắt sự kiện hủy hóa đơn phía khách hàng */
  handleHuyHoaDonPhiaKhachHang(hd: HoaDonResponse) {
    if(this.lyDoHuy.trim().length < 6 || this.lyDoHuy.trim().length > 100) {
      this.notiService.showWarning('Lý do hủy phải trên 6 và dưới 100 ký tự !');
      return;
    }

    this.paymentService.callApiHuyDonHangOPhiaKhachHang(hd.idHoaDon, this.lyDoHuy).subscribe({
      next: (response: any) => {
        this.notiService.showSuccess(response.message);
        this.fetchLichSuGiaoDich();
        this.closeModal('closeModalHuyDonHang');
      },
      error: (err: any) => {
        this.notiService.showError(err.error.message);
      }
    })
  }

 /** Closemodal để đống modal khi submitSearch */
 closeModal(idBtn: string) {
  const closeModalUpdate = document.getElementById(idBtn);
  if (closeModalUpdate) {
    closeModalUpdate.click();
  }
}

  /** Hàm trả ra trạng thái hóa đơn */
  getStatus() {
    return StatusHD;
  }
  /** Hàm trả ra loại hóa đơn */
  getLoaiHoaDon() {
    return LoaiHoaDon;
  }
  ngOnInit(): void {
    this.fetchLichSuGiaoDich();
  }


}
