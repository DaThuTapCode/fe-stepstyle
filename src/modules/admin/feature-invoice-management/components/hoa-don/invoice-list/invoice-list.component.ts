import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../../../services/invoice.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {HoaDonResponse} from "../../../../../../models/hoa-don/response/hoa-don-response";

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


  /** Hàm bắt sự kiện xem chi tiết hóa đơn */
  handleDetailInvoice(idHoaDon: number) {
    this.router.navigate([`/admin/invoice/detail/${idHoaDon}`]);
  }

  /** Hàm bắt sự kiện cập nhật hóa đơn */
  handleUpdateInvoice(idHoaDon: number) {
    this.router.navigate([`/admin/invoice/update/${idHoaDon}`]);
  }

  ngOnInit(): void {
    this.fetchDataHoaDons();
  }



}
