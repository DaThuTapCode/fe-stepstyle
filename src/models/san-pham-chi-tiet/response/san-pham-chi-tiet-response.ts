import { SanPhamResponse } from "../../san-pham/response/san-pham-response";

export class SanPhamChiTietResponse {

  idSpct: number;
  maSpct: string;
  gia: number;
  soLuong: number;
  ngayTao: Date | null;
  ngayChinhSua: Date | null;
  trangThai: string;
  sanPham: SanPhamResponse;

  constructor (data: Partial<SanPhamChiTietResponse> = {}) {
    this.idSpct = data.idSpct || 0;
    this.maSpct = data.maSpct || '';
    this.gia = data.gia || 0;
    this.soLuong = data.soLuong || 0;
    this.ngayTao = data.ngayTao || null;
    this.ngayChinhSua = data.ngayChinhSua || null;
    this.trangThai = data.trangThai || '';
    this.sanPham = data.sanPham || {} as SanPhamResponse;
  }
}
