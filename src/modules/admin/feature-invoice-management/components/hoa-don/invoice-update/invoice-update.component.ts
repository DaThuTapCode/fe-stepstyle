import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { InvoiceService } from '../../../services/invoice.service';
import { ActivatedRoute } from '@angular/router';
import {HoaDonResponse} from "../../../../../../models/hoa-don/response/hoa-don-response";
import {ThanhToanResponse} from "../../../../../../models/thanh-toan/response/thanh-toan-response";
import {PhieuGiamGiaResponse} from "../../../../../../models/phieu-giam-gia/response/phieu-giam-gia-response";
import { KhachHangResponse } from '../../../../../../models/khach-hang/response/khach-hang-response';
import { NhanVienResponse } from '../../../../../../models/nhan-vien/response/nhan-vien-response';

@Component({
  selector: 'app-invoice-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './invoice-update.component.html',
  styleUrl: './invoice-update.component.scss'
})
export class InvoiceUpdateComponent implements OnInit{

/** Biến hứng dữ liệu */
hoaDons: HoaDonResponse[] = [];

/** Biến hứng dữ liệu để chỉnh sửa*/
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
  hoaDonChiTiet: [],
  khachHang: {} as KhachHangResponse,
  nhanVien: {} as NhanVienResponse,
  sanPhamChiTiet: [],
  lichSuHoaDon: []
}

/** Hàm khởi động chạy các phụ thuộc Dependencies Injection */
constructor(private inVoiceService: InvoiceService, private route: ActivatedRoute) {
}

/** Hàm chạy khởi tạo các dữ liệu */
ngOnInit(): void {
this.route.paramMap.subscribe(params => {
  const id = Number(params.get('id'));
  if (id) {
    this.loadInvoiceDetail(id);  // Lấy dữ liệu khách hàng
  }
});
}

/** Hàm tải dữ liệu danh sách các sản phẩm */
fetchDataHoaDons() {
  this.inVoiceService.getAllInvoice().subscribe({
    next: (response: any) => {
      this.hoaDons = response.data;

    },
    error: (err: any) => {
      console.error('Lỗi khi lấy danh sách hóa đơn: ', err);
    }
  })
}

/** Hàm  lấy dữ liệu chi tiết hóa đơn */
loadInvoiceDetail(idHoaDon: number): void {
  this.inVoiceService.getInvoiceById(idHoaDon).subscribe({
    next: (value: any) => {
      this.selectedInvoice = value.data;
      console.log(value);
    }
  })
}



/** Hàm để gọi Update */
submitUpdate() {
  this.inVoiceService.putUpdateInvoice(this.selectedInvoice.idHoaDon, this.selectedInvoice).subscribe({
    next: (response: any) => {
      alert('Cập nhật thành công!');
      this.fetchDataHoaDons();
    },
    error: (err: any) => {
      console.error('Lỗi khi cập nhật hóa đơn', err);
    }

  })
}

}
