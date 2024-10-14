import {StatusSPCT} from "../../../shared/status-spct";
import {ChatLieu} from "../../chat-lieu/response/chat-lieu";
import {KieuDeGiay} from "../../kieu-de-giay/response/kieu-de-giay";
import {ChatLieuDeGiay} from "../../chat-lieu-de-giay/response/chat-lieu-de-giay";
import {TrongLuong} from "../../trong-luong/response/trong-luong";
import {MauSac} from "../../mau-sac/response/mau-sac";
import {KichCo} from "../../kich-co/response/kich-co";
import {Anh} from "../../anh/request/anh";

export class SanPhamChiTietRequest {

  idSpct: number;

  maSpct: string;

  gia: number;

  soLuong: number;

  trangThai: StatusSPCT;

  chatLieu: ChatLieu;

  kieuDeGiay: KieuDeGiay;

  chatLieuDeGiay: ChatLieuDeGiay;

  trongLuong: TrongLuong;

  mauSac: MauSac;

  kichCo: KichCo;

  anhs: Anh;

  constructor(data: Partial<SanPhamChiTietRequest> = {}) {
    this.idSpct = data.idSpct || 0;
    this.maSpct = data.maSpct || '';
    this.gia = data.gia || 1;
    this.soLuong = data.soLuong || 0;
    this.trangThai = data.trangThai || StatusSPCT.ACTIVE;
    this.chatLieu = new ChatLieu(data.chatLieu);
    this.kieuDeGiay = new KieuDeGiay(data.kieuDeGiay);
    this.chatLieuDeGiay = new ChatLieuDeGiay(data.trongLuong);
    this.trongLuong = new TrongLuong(data.trongLuong);
    this.mauSac = new MauSac(data.mauSac);
    this.kichCo = new KichCo(data.kichCo);
    this.anhs = data.anhs || {};
  }


}
