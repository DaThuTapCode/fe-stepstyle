import { AnhShortResponse } from "../../anh/response/anh-short-response";
import { ChatLieuDeGiayResponse } from "../../chat-lieu-de-giay/response/chat-lieu-de-giay-response";
import { ChatLieuResponse } from "../../chat-lieu/response/chat-lieu-response";
import { KichCoResponse } from "../../kich-co/response/kich-co-response";
import { KieuDeGiayResponse } from "../../kieu-de-giay/response/kieu-de-giay-response";
import { MauSacResponse } from "../../mau-sac/response/mau-sac-response";
import { SanPhamResponse } from "../../san-pham/response/san-pham-response";
import { TrongLuongResponse } from "../../trong-luong/response/trong-luong-response";

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
  chatLieu: ChatLieuResponse;
  chatLieuDeGiay: ChatLieuDeGiayResponse;
  kieuDeGiay: KieuDeGiayResponse;
  kichCo: KichCoResponse;
  trongLuong: TrongLuongResponse;
  anhs: AnhShortResponse[];
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
    this.chatLieu = data.chatLieu || {} as ChatLieuResponse;
    this.chatLieuDeGiay = data.chatLieuDeGiay || {} as ChatLieuDeGiayResponse;
    this.kieuDeGiay = data.kieuDeGiay || {} as KieuDeGiayResponse;
    this.kichCo = data.kichCo || {} as KichCoResponse;
    this.trongLuong = data.trongLuong || {} as TrongLuongResponse;
    this.anhs = data.anhs ||  [];
  }
}
