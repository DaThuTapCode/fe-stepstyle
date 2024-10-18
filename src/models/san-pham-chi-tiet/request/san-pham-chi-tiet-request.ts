import {StatusSPCT} from "../../../shared/status-spct";
import {Anh} from "../../anh/request/anh";
import { ChatLieuDeGiayResponse } from "../../chat-lieu-de-giay/response/chat-lieu-de-giay-response";
import { ChatLieuResponse } from "../../chat-lieu/response/chat-lieu-response";
import { KichCoResponse } from "../../kich-co/response/kich-co-response";
import { KieuDeGiayResponse } from "../../kieu-de-giay/response/kieu-de-giay-response";
import { MauSacResponse } from "../../mau-sac/response/mau-sac-response";
import { TrongLuongResponse } from "../../trong-luong/response/trong-luong-response";

export class SanPhamChiTietRequest {

  idSpct: number;

  maSpct: string;

  gia: number;

  soLuong: number;

  trangThai: StatusSPCT;

  chatLieu: ChatLieuResponse;

  kieuDeGiay: KieuDeGiayResponse;

  chatLieuDeGiay: ChatLieuDeGiayResponse;

  trongLuong: TrongLuongResponse;

  mauSac: MauSacResponse;

  kichCo: KichCoResponse;

  anhs: Anh;

  constructor(data: Partial<SanPhamChiTietRequest> = {}) {
    this.idSpct = data.idSpct || 0;
    this.maSpct = data.maSpct || '';
    this.gia = data.gia || 1;
    this.soLuong = data.soLuong || 0;
    this.trangThai = data.trangThai || StatusSPCT.ACTIVE;
    this.chatLieu = new ChatLieuResponse(data.chatLieu);
    this.kieuDeGiay = new KieuDeGiayResponse(data.kieuDeGiay);
    this.chatLieuDeGiay = new ChatLieuDeGiayResponse(data.trongLuong);
    this.trongLuong = new TrongLuongResponse(data.trongLuong);
    this.mauSac = new MauSacResponse(data.mauSac);
    this.kichCo = new KichCoResponse(data.kichCo);
    this.anhs = data.anhs || {};
  }


}
