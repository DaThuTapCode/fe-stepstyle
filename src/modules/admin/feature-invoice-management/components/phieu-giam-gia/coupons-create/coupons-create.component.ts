import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PhieuGiamGiaRequest } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-request';
import { CouponsService } from '../../../services/coupons.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-coupons-create',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './coupons-create.component.html',
  styleUrl: './coupons-create.component.scss'
})
export class CouponsCreateComponent implements OnInit {

  /** Biến để thêm phiếu giảm giá */
  newCoupons: PhieuGiamGiaRequest = {
    idPhieuGiamGia: 0,
    maPhieuGiamGia: '',
    tenPhieuGiamGia: '',
    moTa: '',
    loaiGiam: '',
    giaTriGiamToiDa: 0,
    giaTriGiamToiThieu: 0,
    giaTriGiam: 0,
    trangThai: 'ACTIVE'
  }

  constructor(
    private couPonsService: CouponsService,
    private router: Router
  ) { }

  /** Hàm thêm phiếu giảm giá mới */
  submitAdd() {
    this.couPonsService.postCoupons(this.newCoupons).subscribe({
      next: (response: any) => {
        this.router.navigate([`admin/coupons/list`]);
      },
      error: (err:  any) => {
        console.error('Lỗi khi thêm phiếu giảm giá: ', err); 
      }
    })
  }
  ngOnInit(): void {

  }

}
