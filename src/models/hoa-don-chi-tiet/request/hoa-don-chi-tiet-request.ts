import {HoaDonRequest} from "../../hoa-don/request/hoa-don-request";
import { SanPhamChiTietRequest } from "../../san-pham-chi-tiet/request/san-pham-chi-tiet-request";


export class HoaDonChiTietRequest {
  idHoaDonChiTiet: number;

  hoaDon: HoaDonRequest;

  spct: SanPhamChiTietRequest [];

  maHoaDonChiTiet: string;

  soLuong: string;

  donGia: number;

  tongTien: number;

  trangThai: string;

  constructor (data: Partial<HoaDonChiTietRequest> = {}){
    this.idHoaDonChiTiet = data.idHoaDonChiTiet || 0;
    this.hoaDon = data.hoaDon || {} as HoaDonRequest;
    this.spct = data.spct || [];
    this.maHoaDonChiTiet = data.maHoaDonChiTiet || '';
    this.soLuong = data.soLuong || '';
    this.donGia = data.donGia || 0;
    this.tongTien = data.tongTien || 0;
    this.trangThai = data.trangThai || '';
  }
}
