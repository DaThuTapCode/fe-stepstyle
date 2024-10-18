import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HoaDonResponse} from "../../../../../../models/hoa-don/response/hoa-don-response";
import { HoaDonSearch } from '../../../../../../models/hoa-don/request/hoa-don-search';
import { LichSuHoaDonResponse } from '../../../../../../models/lich-su-hoa-don/response/lich-su-hoa-don-response';
import { HoaDonChiTietResponse } from '../../../../../../models/hoa-don-chi-tiet/response/hoa-don-chi-tiet-response';

@Component({
  selector: 'app-invoice-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-list.component.html',
  styleUrl: './invoice-list.component.scss'
})
export class InvoiceListComponent implements OnInit {

  /** Biến hứng dữ liệu */
  hoaDons: HoaDonResponse[] = [];

  /** Biến gửi dữ liệu tìm kiếm */
  inVoiceSearch: HoaDonSearch = {
    maHoaDon: null,
    ngayTaoStart: null,
    ngayTaoEnd: null,
    idKhachHang: null,
    idNhanVien: null,
    idThanhToan: null,
    idPhieuGiamGia: null
  };

  /** Phân trang */
  size: number = 1;
  page: number = 0;
  totalPages: number = 1;

  constructor(
    private inVoiceService: InvoiceService,
    private router: Router
  ) { }

  /** Hàm tải dữ liệu danh sách các sản phẩm */
  fetchDataHoaDons() {
    this.inVoiceService.getAllInvoice().subscribe({
      next: (response: any) => {
        this.hoaDons = response.data;
        console.log('HoaDons', this.hoaDons);
      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách hóa đơn: ', err);
      }
    })
  }

  /** Hàm tìm kiếm phân trang Hóa Đơn */
  fetchDataSearchHoaDon() {
    this.inVoiceService.searchPageInvoice(this.inVoiceSearch, this.page, this.size).subscribe({
      next: (response: any) => {
        this.hoaDons = response.data.content;
        this.totalPages = response.data.totalPages;
        console.log("HoaDonPage", response);
      }
    })
  }

  /** Hàm bắt sự kiện thay đổi trang */
  changePage(pageNew: number) {
    this.page = pageNew;
    this.fetchDataSearchHoaDon();
  }

  /** Hàm bắt sự kiện xem chi tiết hóa đơn */
  handleDetailInvoice(idHoaDon: number) {
    this.router.navigate([`/admin/invoice/detail/${idHoaDon}`]);
  }

  /** Hàm bắt sự kiện cập nhật hóa đơn */
  handleUpdateInvoice(idHoaDon: number) {
    this.router.navigate([`/admin/invoice/update/${idHoaDon}`]);
  }

  ngOnInit(): void {
    this.fetchDataSearchHoaDon();
    // this.fetchDataHoaDons();
  }

}
