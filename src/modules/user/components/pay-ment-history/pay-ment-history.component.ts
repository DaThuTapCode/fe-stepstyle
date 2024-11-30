import { Component, OnInit } from '@angular/core';
import { HomeUserService } from '../../service/home-user.service';
import { HoaDonResponse } from '../../../../models/hoa-don/response/hoa-don-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HamDungChung } from '../../../../shared/helper/ham-dung-chung';
import { StatusHD } from '../../../../shared/status-hd';
import { LoaiHoaDon } from '../../../../shared/loaihoadon';

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
  hoaDonDangChon: HoaDonResponse  = new HoaDonResponse();

  constructor(
     private homeUserService: HomeUserService,
     public hamDungChung: HamDungChung
    ) {}

  fetchLichSuGiaoDich() {
    this.homeUserService.getLichSuGiaoDich().subscribe({
      next: (response: any)  => {
        this.listLichSuGiaoDich = response.data;
      } 
    })
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
  handleChonHoaDonCanXem(hd: HoaDonResponse) {
    this.hoaDonDangChon = hd;
  }


  kiemTraNutHuy(hd: HoaDonResponse): boolean {

    if(
      hd.trangThai != StatusHD.CANCELLED && 
      hd.trangThai != StatusHD.SHIPPING && 
      hd.trangThai != StatusHD.PAID && 
      hd.trangThai != StatusHD.CONFIRMED 
    ){
      return true;
    }
    return false;
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
