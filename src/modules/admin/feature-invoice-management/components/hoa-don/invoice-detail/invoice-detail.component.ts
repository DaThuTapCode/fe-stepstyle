import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../../services/invoice.service';
import { HoaDonResponse } from "../../../../../../models/hoa-don/response/hoa-don-response";
import { HoaDonChiTietResponse } from "../../../../../../models/hoa-don-chi-tiet/response/hoa-don-chi-tiet-response";
import { LichSuHoaDonResponse } from "../../../../../../models/lich-su-hoa-don/response/lich-su-hoa-don-response";
import { ThanhToanResponse } from "../../../../../../models/thanh-toan/response/thanh-toan-response";
import { PhieuGiamGiaResponse } from "../../../../../../models/phieu-giam-gia/response/phieu-giam-gia-response";
import { ActivatedRoute } from "@angular/router";
import { InvoiceDetailService } from '../../../services/invoice-detail.service';


@Component({
  selector: 'app-invoice-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-detail.component.html',
  styleUrl: './invoice-detail.component.scss'
})
export class InvoiceDetailComponent implements OnInit {

  /** Biến hứng dữ liệu */
  hoaDons: HoaDonResponse[] = [];
  hoaDonChiTiets: HoaDonChiTietResponse[] = [];
  lichSuHoaDons: LichSuHoaDonResponse[] = [];

  /** Biến hứng dữ liệu để xem */
  selectedInvoice: HoaDonResponse = {
    idHoaDon: 0,
    maHoaDon: "",
    ngayChinhSua: undefined,
    ngayNhanHang: undefined,
    ngayTaoDon: undefined,
    ngayXacNhan: undefined,
    phiVanChuyen: 0,
    tongTien: 0,
    tongTienSauGiam: 0,
    loaiHoaDon: '',
    tenKhachHang: '',
    diaChiGiaoHang: '',
    soDienThoaiKhachHang: '',
    ghiChu: '',
    trangThai: 'PAID',
    thanhToan: {} as ThanhToanResponse,
    phieuGiamGia: {} as PhieuGiamGiaResponse,
    hoaDonChiTiet: []
  }


  /** Biến hứng dữ liệu để xem */
  selectedInvoiceDetail: HoaDonChiTietResponse = {
    idHoaDonChiTiet: 0,
    hoaDon: {} as HoaDonResponse,
    // spct: SanPhamChiTiet [],
    maHoaDonChiTiet: '',
    soLuong: '',
    donGia: 0,
    tongTien: 0,
    trangThai: 'ACTIVE'
  }


  /** Hàm khởi động chạy các phụ thuộc Dependencies Injection */
  constructor(
    private invoiceService: InvoiceService,
    private route: ActivatedRoute,
    private invoiceDetailService: InvoiceDetailService
  ) {
  }

  /** Hàm chạy khởi tạo các dữ liệu */
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = Number(params.get('id'));
      if (id) {
        this.loadInvoiceDetail(id);  // Lấy dữ liệu hóa đơn
        this.loadInvoiceDeatilDetail(id);
      }
    });
  }


  loadInvoiceDetail(idHoaDon: number): void {
    this.invoiceService.getInvoiceById(idHoaDon).subscribe({
      next: (value: HoaDonResponse) => {
        this.selectedInvoice = value;
      }
    })
  }

  loadInvoiceDeatilDetail(idHoaDonChiTiet: number): void {
    this.invoiceDetailService.getInvoiDetailceById(idHoaDonChiTiet).subscribe({
      next: (value: HoaDonChiTietResponse) => {
        this.selectedInvoiceDetail = value;
      }
    })
  }

  /** Hàm tải dữ liệu danh sách các sản phẩm */
  fetchDataHoaDons() {
    this.invoiceService.getAllInvoice().subscribe({
      next: (response: any) => {
        this.hoaDons = response.data;
        this.hoaDonChiTiets = response.data;
        console.log('HoaDons', this.hoaDons);
        console.log('HoaDonChiTiets', this.hoaDonChiTiets);

      },
      error: (err: any) => {
        console.error('Lỗi khi lấy danh sách hóa đơn: ', err);
      }
    })
  }
}
