import {StatusSPCT} from "../../../shared/status-spct";

import { ChatLieuDeGiayRequest } from "../../chat-lieu-de-giay/request/chat-lieu-de-giay-request";
import { ChatLieuRequest } from "../../chat-lieu/request/chat-lieu-request";
import { KichCoRequest } from "../../kich-co/request/kich-co-request";
import { KieuDeGiayRequest } from "../../kieu-de-giay/request/kieu-de-giay-request";
import { MauSacRequest } from "../../mau-sac/request/mau-sac-request";
import { TrongLuongRequest } from "../../trong-luong/request/trong-luong-request";

export class SanPhamChiTietRequest {

  idSpct: number;

  maSpct: string;

  gia: number;

  soLuong: number;

  trangThai: StatusSPCT;

  chatLieu: ChatLieuRequest;

  kieuDeGiay: KieuDeGiayRequest;

  chatLieuDeGiay: ChatLieuDeGiayRequest;

  trongLuong: TrongLuongRequest;

  mauSac: MauSacRequest;

  kichCo: KichCoRequest;

  anhs: File | null;
  
  isEditable: boolean;

  constructor(data: Partial<SanPhamChiTietRequest> = {}) {
    this.idSpct = data.idSpct || 0;
    this.maSpct = data.maSpct || '';
    this.gia = data.gia || 1;
    this.soLuong = data.soLuong || 0;
    this.trangThai = data.trangThai || StatusSPCT.ACTIVE;
    this.chatLieu = new ChatLieuRequest(data.chatLieu);
    this.kieuDeGiay = new KieuDeGiayRequest(data.kieuDeGiay);
    this.chatLieuDeGiay = new ChatLieuDeGiayRequest(data.trongLuong);
    this.trongLuong = new TrongLuongRequest(data.trongLuong);
    this.mauSac = new MauSacRequest(data.mauSac);
    this.kichCo = new KichCoRequest(data.kichCo);
    this.anhs = data.anhs || null;
    this.isEditable = data.isEditable || false;
  }


}
