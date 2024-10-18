import { Component, OnInit } from '@angular/core';
import { PhieuGiamGiaResponse } from '../../../../../../models/phieu-giam-gia/response/phieu-giam-gia-response';
import { PhieuGiamGiaSearch } from '../../../../../../models/phieu-giam-gia/request/phieu-giam-gia-search';
import { CouponsService } from '../../../services/coupons.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-coupons-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
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

  /** Phân trang */
  size: number = 1;
  page: number = 0;
  totalPages: number = 1;

  constructor(
    private couPonsService: CouponsService,
    private router: Router
  ) { }
  

  /** Hàm tải dữ liệu danh sách các phiếu giảm giá */
  fetchDataPhieuGiamGias() {
    this.couPonsService.getAllCoupons().subscribe({
      next: (response: any) => {
        this.phieuGiamGias = response.data;
        console.log('PhieuGiamGias', this.phieuGiamGias);
        
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách phiếu giảm giá', err);
        
      }
    })
  }

  /** Hàm tìm kiếm phân trang Phiếu Giảm Giá */
  fetchDataSearchPhieuGiamGia() {
    this.couPonsService.searchPageCoupons(this.phieuGiamGiaSearch, this.page, this.size).subscribe({
      next: (response: any) => {
        this.phieuGiamGias = response.data.content;
        this.totalPages = response.data.totalPages;
        console.log('PhieuGiamGiaPage', response);
        
      }
    })
  }

  /** Hàm bắt sư kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchPhieuGiamGia();
  }

  /** Hàm bắt sự kiện thêm phiếu giảm giá */
  handleCreatePhieuGiamGia() {
    this.router.navigate([`/admin/coupons/create`]);
  }

  /** Hàm bắt sự kiện cập nhật phiếu giảm giá */
  handleUpdatePhieuGiamGia(idPhieuGiamGia: number) {
    this.router.navigate([`/admin/coupons/update/${idPhieuGiamGia}`]);
  }

  /** Hàm bắt sự kiện xóa phiếu giảm giá */
  deletePhieuGiamGia(idPhieuGiamGia: number) {
    this.couPonsService.deleteCoupons(idPhieuGiamGia).subscribe({
      next: (response: any) => {
        this.phieuGiamGias = response.data;
        console.log('PhieuGiamGias', this.phieuGiamGias);    
      },
      error: (err: any) => {
        console.error('Lỗi khi xóa phiếu giảm giá: ', err);
      }
    })
  }

  ngOnInit(): void {
    this.fetchDataSearchPhieuGiamGia();
    // this.fetchDataPhieuGiamGias();
  }
}
