import {HoaDonResponse} from "../../hoa-don/response/hoa-don-response";

export class HoaDonChiTietResponse {
  idHoaDonChiTiet: number;

  hoaDon: HoaDonResponse;

  // spct: SanPhamChiTiet [];

  maHoaDonChiTiet: string;

  soLuong: string;

  donGia: number;

  tongTien: number;

  trangThai: string;

  constructor (data: Partial<HoaDonChiTietResponse> = {}){
    this.idHoaDonChiTiet = data.idHoaDonChiTiet || 0;
    this.hoaDon = data.hoaDon || {} as HoaDonResponse;
    // this.spct = data.spct || [];
    this.maHoaDonChiTiet = data.maHoaDonChiTiet || '';
    this.soLuong = data.soLuong || '';
    this.donGia = data.donGia || 0;
    this.tongTien = data.tongTien || 0;
    this.trangThai = data.trangThai || '';
  }
}
