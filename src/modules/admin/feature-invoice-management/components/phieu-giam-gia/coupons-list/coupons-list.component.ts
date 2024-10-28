import { Component, OnInit } from '@angular/core';
import { PhieuGiamGiaResponse } from '../../../../../../models/phieu-giam-gia/response/phieu-giam-gia-response';
import { PhieuGiamGiaSearch } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-search';
import { CouponsService } from '../../../services/coupons.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTabsModule } from '@angular/material/tabs';
import { NotificationService } from '../../../../../../shared/notification.service';

export enum StatusPGG {
  ACTIVE = 'ACTIVE',
  USED = 'USED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED'
}

@Component({
  selector: 'app-coupons-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTabsModule],
  templateUrl: './coupons-list.component.html',
  styleUrl: './coupons-list.component.scss'
})
export class CouponsListComponent implements OnInit {

  /** Biến hứng dữ liệu */
  phieuGiamGias: PhieuGiamGiaResponse[] = [];

  /** Biến gửi dữ liệu tìm kiếm */
  phieuGiamGiaSearch: PhieuGiamGiaSearch = {
    maPhieuGiamGia: null,
    tenPhieuGiamGia: null,
    ngayBatDau: null,
    ngayKetThuc: null,
    loaiGiam: null,
    trangThai: null
  };

  /** Biến gọi số lượng phiếu giảm giá */
  couponsCount: number = 0;
  couponsActiveCount: number = 0;
  couponsUsedCount: number = 0;
  couponsExpiredCount: number = 0;
  couponsCanceledCount: number = 0;

  /** Biến enum Phiếu giảm giá để sử dụng trong template */
  /** Khai báo enum PGG */
  StatusPGG = StatusPGG

  /** Phân trang */
  size: number = 10;
  page: number = 0;
  totalPages: number = 1;


  constructor(
    private couPonsService: CouponsService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  /** Hàm bắt dữ liệu trạng thái của hóa đơn chi tiết */
  getCouponsStatus(status: string): string {
    switch (status) {
      case StatusPGG.ACTIVE:
        return 'Đang hoạt động';
      case StatusPGG.USED:
        return 'Đã được sử dụng';
      case StatusPGG.EXPIRED:
        return 'Đã hết hạn';
      case StatusPGG.CANCELLED:
        return 'Đã bị hủy';
      default:
        return 'Không xác định';
    }
  }



  /** Hàm tìm kiếm phân trang Phiếu Giảm Giá */
  fetchDataSearchPhieuGiamGia() {
    this.couPonsService.searchPageCoupons(this.phieuGiamGiaSearch, this.page, this.size).subscribe({
      next: (response: any) => {
        this.phieuGiamGias = response.data.content;
        this.couponsCount = this.phieuGiamGias.length;
        this.totalPages = response.data.totalPages;
        this.getCouponsCountByStatus();
      },
      error: (err: any) => {
        console.error('Lỗi khi tìm kiếm Phiếu giảm giá', err);

      }
    })
  }

  /** Hàm lấy số lượng phiếu giảm giá theo trạng thái */
  getCouponsCountByStatus() {
    this.couPonsService.getCouponsCount().subscribe({
      next: (response: any) => {
        this.couponsActiveCount = response.ACTIVE || 0;
        this.couponsUsedCount = response.USED || 0;
        this.couponsExpiredCount = response.EXPIRED || 0;
        this.couponsCanceledCount = response.CANCELLED || 0;
      },
      error: (err: any) => {
        console.error('Lỗi khi hiển thị số lượng hóa đơn theo trạng thái', err);
      }
    });
  }

  /** Hàm bắt sư kiện thay đổi trang cho tất cả phiếu giảm giá */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchPhieuGiamGia();
  }


  /** Dữ liệu phiếu giảm giá được chọn để xem */
  selectedCoupons: PhieuGiamGiaResponse = {
    idPhieuGiamGia: 0,
    maPhieuGiamGia: '',
    tenPhieuGiamGia: '',
    moTa: '',
    loaiGiam: '',
    giaTriGiamToiDa: 0,
    giaTriGiamToiThieu: 0,
    giaTriGiam: 0,
    trangThai: ''
  };

  /** Hàm bắt sự kiện chi tiết phiếu giảm giá */
  handleDetailPhieuGiamGia(phieuGiamGia: any): void {
    this.selectedCoupons = phieuGiamGia;
  }

  /** Hàm bắt sự kiện thêm phiếu giảm giá */
  handleCreatePhieuGiamGia() {
    this.router.navigate([`/admin/coupons/create`]);
  }

  /** Hàm bắt sự kiện cập nhật phiếu giảm giá */
  handleUpdatePhieuGiamGia(idPhieuGiamGia: number) {
    this.router.navigate([`/admin/coupons/update/${idPhieuGiamGia}`]);
  }

  ngOnInit(): void {
    this.fetchDataSearchPhieuGiamGia();
    this.getCouponsCountByStatus();
  }
}
