import {HoaDonResponse} from "../../hoa-don/response/hoa-don-response";
import { SanPhamChiTietResponse } from "../../san-pham-chi-tiet/response/san-pham-chi-tiet-response";

export class HoaDonChiTietResponse {
  idHoaDonChiTiet: number;

  hoaDon: HoaDonResponse;

  sanPhamChiTiet: SanPhamChiTietResponse ;

  maHoaDonChiTiet: string;

  soLuong: number;

  donGia: number;

  tongTien: number;

  trangThai: string;

  constructor (data: Partial<HoaDonChiTietResponse> = {}){
    this.idHoaDonChiTiet = data.idHoaDonChiTiet || 0;
    this.hoaDon = data.hoaDon || {} as HoaDonResponse;
    this.sanPhamChiTiet = data.sanPhamChiTiet || {} as SanPhamChiTietResponse;
    this.maHoaDonChiTiet = data.maHoaDonChiTiet || '';
    this.soLuong = data.soLuong || 0;
    this.donGia = data.donGia || 0;
    this.tongTien = data.tongTien || 0;
    this.trangThai = data.trangThai || '';
  }
}
