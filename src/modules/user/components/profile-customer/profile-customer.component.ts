import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KhachHangService } from '../../../admin/feature-customer-management/service/khach-hang.service';
import { KhachHangResponse } from '../../../../models/khach-hang/response/khach-hang-response';
import { NotificationComponent } from "../../../../shared/notification/notification.component";
import { NotificationService } from '../../../../shared/notification.service';
import { SessionloginService } from '../../../../core/auth/sessionlogin.service';

@Component({
  selector: 'app-profile-customer',
  standalone: true,
  imports: [CommonModule, FormsModule, NotificationComponent],
  templateUrl: './profile-customer.component.html',
  styleUrl: './profile-customer.component.scss'
})
export class ProfileCustomerComponent implements OnInit {

  customer: KhachHangResponse = new KhachHangResponse();


    /**Tài dữ liệu khách hàng theo id */
    fetchKhachHangById(idKhachHang: number): void {
      this.khachHangService.getCustomerById(idKhachHang).subscribe({
        next: (response: any) => {
          this.customer = response.data;
        },
        error: (err: any) => {
          this.notiService.showError('Bạn chưa đăng nhập với tài khoản khách hàng!')
        }
      })
    }

  constructor(
    private khachHangService: KhachHangService,
    private notiService: NotificationService,
    private sessionLogin: SessionloginService,
  ){

  }

  ngOnInit(): void {
    this.fetchKhachHangById(this.sessionLogin.getUser().id);
  }

  
}
