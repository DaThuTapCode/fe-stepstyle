import { SanPhamChiTietRequest } from "../../san-pham-chi-tiet/request/san-pham-chi-tiet-request";
import { SanPhamChiTietResponse } from "../../san-pham-chi-tiet/response/san-pham-chi-tiet-response";

export class HoaDonChiTietBanOnlineRequest {
    sanPhamChiTiet: SanPhamChiTietResponse;
    soLuong: number;
    donGia: number;
  
    constructor(data: Partial<HoaDonChiTietBanOnlineRequest> = {}) {
      this.sanPhamChiTiet = data.sanPhamChiTiet || {} as SanPhamChiTietResponse;
      this.soLuong = data.soLuong || 1;
      this.donGia = data.donGia || 0;
    }
  }
  