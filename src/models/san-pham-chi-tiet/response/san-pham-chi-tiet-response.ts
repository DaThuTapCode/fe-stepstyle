import { KichCoResponse } from "../../kich-co/response/kich-co-response";
import { MauSacResponse } from "../../mau-sac/response/mau-sac-response";
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
  mauSac: MauSacResponse;
  kichCo: KichCoResponse;
  anh: string | null;
  constructor (data: Partial<SanPhamChiTietResponse> = {}) {
    this.idSpct = data.idSpct || 0;
    this.maSpct = data.maSpct || '';
    this.gia = data.gia || 0;
    this.soLuong = data.soLuong || 0;
    this.ngayTao = data.ngayTao || null;
    this.ngayChinhSua = data.ngayChinhSua || null;
    this.trangThai = data.trangThai || '';
    this.sanPham = data.sanPham || {} as SanPhamResponse;
    this.mauSac = data.mauSac || {} as MauSacResponse;
    this.kichCo = data.kichCo || {} as KichCoResponse;
    this.anh = data.anh ||  null;
  }
}
