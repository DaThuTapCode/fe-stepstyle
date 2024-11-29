import { Component, OnInit } from '@angular/core';
import { HomeUserService } from '../../service/home-user.service';
import { HoaDonResponse } from '../../../../models/hoa-don/response/hoa-don-response';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatusHD } from '../../../../shared/status-hd';
import { HamDungChung } from '../../../../shared/helper/ham-dung-chung';

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


  constructor(
     private homeUserService: HomeUserService,
     public hamDungChung: HamDungChung) {}

  fetchLichSuGiaoDich() {
    this.homeUserService.getLichSuGiaoDich().subscribe({
      next: (response: any)  => { 
        this.listLichSuGiaoDich = response.data;
        console.log('Lich ', this.listLichSuGiaoDich)
      } 
    })
  }


  
  ngOnInit(): void {
    this.fetchLichSuGiaoDich();
  }


}
