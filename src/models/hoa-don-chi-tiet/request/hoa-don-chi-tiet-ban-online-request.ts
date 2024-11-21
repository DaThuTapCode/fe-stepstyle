import { SanPhamChiTietRequest } from "../../san-pham-chi-tiet/request/san-pham-chi-tiet-request";

export class HoaDonChiTietBanOnlineRequest {
    sanPhamChiTiet: SanPhamChiTietRequest;
    soLuong: number;
  
    constructor(data: Partial<HoaDonChiTietBanOnlineRequest> = {}) {
      this.sanPhamChiTiet = data.sanPhamChiTiet || {} as SanPhamChiTietRequest;
      this.soLuong = data.soLuong || 1;
    }
  }
  